define(["Datum", "Binder", "ObjectBinding"], function(Datum, Binder, ObjectBinding) {

	function PropertyType(createViewModel) {

		this.injectProperty = function(property, model, key) {

			var datum = new Datum(property);

			Object.defineProperty(model, key, {

				get: function() {

					return datum.get();
				},
				set: function(value) {

					datum.set(value);
				}
			});
		};

		this.createViewModel = function(model) {

			return createViewModel(model);
		};

		this.createObjectBinding = function() {

			return new Binder(new ObjectBinding());
		};
	}

	return PropertyType;
});