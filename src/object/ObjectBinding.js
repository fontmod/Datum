define(["tracking/Registry", "tracking/Dependant"], function(Registry, Dependant) {

	function ObjectBinding() {

		var elements = [];

		var removed = false;

		this.setUpElement = function(parentModel, element) {

			elements.push(element.toObjectElement());
		};

		this.updateElement = function(parentModel, element, model) {

			var objectElement = getObjectElement(element);

			if (model) {

				if (removed) {

					removed = false;
					objectElement.replaceChildren();
				}
			}
			else {

				removed = true;
				objectElement.removeChildren();
			}
		};

		function getObjectElement(element) {

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					return elements[i];
				}
			}
		}

		this.resetElement = function(element) {

			var objectElement;

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					objectElement = elements[i];
					elements.splice(i, 1);
					break;
				}
			}

			objectElement.replaceChildren();
		};

		this.createCallback = function(scope, element) {

			var running = false;

			function callback() {

				if (!running) {

					running = true;
					scope.rebind();
					running = false;
				}
			}

			new Registry().assignUpdater(new Dependant(callback, this, element));
		};
	}

	return ObjectBinding;
});
