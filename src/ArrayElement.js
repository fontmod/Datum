define([], function() {

	 function ArrayElement(element) {

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

			if (element.hasAttribute && element.hasAttribute("name")) {

				var name = element.getAttribute("name") + "_" + index;

				element.setAttribute("name", name);
			}

			if (element.children) {

				for (var i = 0; i < element.children.length; i++) {

					number(element.children[i], index);
				}
			}
		}
	}

	return ArrayElement;
});