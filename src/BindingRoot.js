function BindingRoot(model) {

	this.assertUniqueness();

	var injectProperty = function(key, model, property) {

		var datum = new Datum(property);

		Object.defineProperty(model, key, {

			get: function() { return datum(); },
			set: function(value) { datum(value); }
		});
	};

	var self = this;

	// This method binds an object to a DOM element.
	// It is called recursively to bind the entire data structure.
	BindingRoot.bindObject = function(scope, model) {
	
		if (model.onBind) {
		
			model.onBind(scope);
		}

		var newBinding = !model._scope;

		model._scope = scope;

		if (model instanceof Array) {

			var foreach = new BindingRoot.ForEach(scope, model);
		}
		else {
		
			scope._rebind = function() {
	
				BindingRoot.bindObject(scope, model);
			};
		}

		if (!model.toJSON) {

			new BindingRoot.ViewModel(model);
		}

		for(var key in model) {

			if (key == "_scope") {

				continue;
			}

			var property = model[key];
			
			var element;
	
			if (isNaN(key)) {
			
				element = 
					scope.querySelector("[data-bind=" + key + "]");
			}
			else {
			
				element = scope.children[key];
			}

			if (property && property.applyBinding) {
	
				property.applyBinding(model._scope, key, model);
			}
			else if (typeof(property) != "function") {

				if (newBinding) {

					injectProperty(key, model, property);
				}

				if (element && typeof(property) == "object") {

					new BindingRoot.With(model, key, element);

					if (property) {

						BindingRoot.bindObject(element, property);
					}
				}
			}
		}
	};

	var scope = document.querySelector("body");

	BindingRoot.bindObject(scope, model);

	this.rebindDataStructure(function() {

		BindingRoot.bindObject(scope, model);
	});

	var domWatcher = new BindingRoot.DomWatcher(scope);

	this.disconnect = function() {

		domWatcher.disconnect();
	};
}

BindingRoot.prototype = new UniqueRoot();
