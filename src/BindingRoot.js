function BindingRoot(model) {

	this.assertUniqueness();

	var bindObject = function(scope, model) {

		var newBinding = !model._scope;

		if (newBinding) {

			model._scope = scope;
		}

		for(var key in model)
		{
			var injectProperty = function(key, property) {

				var datum = new Datum(property);

				Object.defineProperty(model, key, {

					get: function() { return datum(); },
					set: function(value) { datum(value); }
				});
			};

			var property = model[key];
	
			if (property && property.isBinding) {
	
				property.bind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				var element = model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					bindObject(element, property);
				}
			}
			else if ((typeof(property) != "function") && newBinding) {

				injectProperty(key, property);
			}
		}
	};

	var scope = document.querySelector("body");

	bindObject(scope, model);

	this.rebind(function() {

		bindObject(scope, model);
	});
}

BindingRoot.prototype = new UniqueRoot();
