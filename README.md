
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

Projekt wykorzystuje następujące zewnętrzne biblioteki: [jQuery](https://github.com/jquery/jquery), [jQuery Mobile](https://github.com/jquery/jquery-mobile), [p5.js](https://github.com/processing/p5.js?files=1), [noUiSlider](https://github.com/leongersen/noUiSlider), [jsPsych](https://github.com/jspsych/jsPsych/), [lab.js](https://github.com/felixhenninger/lab.js), [Bootstrap 4](https://github.com/twbs/bootstrap), [jQuery UI AffectButton](https://github.com/erikkemperman/jquery.ui.affectbutton).

## Licencje oprogramowania

Jeden z widgetów wchodzących w skład projektu jest bezpośrednią modyfikacją [kodu źródłowego autorstwa Erika Kempermana](https://github.com/erikkemperman/jquery.ui.affectbutton), będącego reimplementacją oryginalnego AffectButtonu autorstwa [Joosta Broekensa](http://www.joostbroekens.com/). AffectButton objęty jest licencją Creative Commons License [CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/), co w skrócie oznacza, że można używać oraz modyfikować kod źródłowy do celów badawczych i edukacyjnych, wymaga jednak notki o oryginalnym autorstwie oraz cytowania źródła. Nie wolno używać go do celów komercyjnych. Więcej informacji [tutaj](http://ii.tudelft.nl/~joostb/affectbutton.html).

Ponadto projekt wykorzystuje jako dependencje biblioteki o następujących licencjach:
  - p5.js - GNU LGPL
  - noUiSlider - MIT License
  - jQuery - MIT License
  - jsPsych - Apache License
