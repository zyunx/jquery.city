# jquery.city
A jquery plugin for user to select a city

## Usage

### $.city(cities_data) - Set the cities data. 

cities data format:

+	cities data := {
	{ `<city_id`>: `<next_level_cities`> }
	...
}
+	next`_level`_cities := {
	`<city_id`>: `<city_name`>,
	`<city_id>: <city_name`>,
    ...
}
 
### $(selector).city(options) - Turn the selector elem to city control.
options:

+	name - the input's name
+	city - the id for the initial selected city 

## Example
see city.html
