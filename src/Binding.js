function Binding(bindings) {

	var query = function(query) {

		return document.querySelector(query);
	};

	this.bind = function(name) {

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.bind(name);
		}
		
		if (bindings.value) {

			var element = query("[data-bind=" + name + "]");

			element.value = bindings.value;

			element.addEventListener("change", function(event) {

				bindings.value(event.target.value);	
			});
		}
	};
}
