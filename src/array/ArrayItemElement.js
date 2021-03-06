define([], function() {

	 function ArrayItemElement(element) {

		var index = 0;

		this.clone = function() {

			var clone = element.cloneNode(true);

			number(clone, index++);

			return clone;
		};

		function number(element, index) {

			if (element.id) {

				element.id = element.id + "_" + index;
			}

			if (element.hasAttribute("name")) {

				var name = element.getAttribute("name") + "_" + index;

				element.setAttribute("name", name);
			}

			for (var i = 0; i < element.children.length; i++) {

				number(element.children[i], index);
			}
		}

		this.get = function() {

			return element;
		};
	}

	return ArrayItemElement;
});
