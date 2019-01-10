# Affect Input Library

Affect Input Library jest to zbiór widgetów JavaScript przeznaczonych do  zbierania subiektywnych afektywnych ocen użytkowników.  Powstały one w oparciu o występujące w literaturze modele opisu emocji.

## Struktura projektu

- **dev**
	- **demo** - demonstracje użycia widgetów w eksperymentach,
		- **jspsych** - zbiór przykładowych eksperymentów z użyciem biblioteki jspsych,
		- **labjs** - zbiór przykładowych eksperymentów z użyciem biblioteki jspsych,
	- **img** - katalog zawiera podzbiór zbioru obrazów OASIS używany w przykładach,
	- **jspsych** - zbiór przykładowych pluginów do jspsych wykorzystujących widgety wchodzące w skład biblioteki,
	- **lib** - pliki źródłowe widgetów,
		- **assets** - pliki svg używane przez widgety,
		- **config-templates** - zbiór szablonów obiektów konfiguracyjnych do widgetów,
		- **css** - kod źródłowy CSS odpowiedzialny za ostylowanie niektórych z widgetów,
		- **demo** - demonstracje poszczególnych widgetów,
		- **js** - kod źródłowy JavaScript widgetów,
	- **vendors** - zewnętrzne biblioteki 
- **docs** - dodatkowe pliki z dokumentacją, statyczne makiety itp.

## Zależności

Projekt wykorzystuje następujące zewnętrzne biblioteki: jQuery, jQuery Mobile, p5.js, noUiSlider, jsPsych, lab.js, Bootstrap 4, jQuery UI AffectButton.