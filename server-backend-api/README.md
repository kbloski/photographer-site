## Spis treści

- [Opis projektu](#opis-projektu)
- [Wymagania](#wymagania)
- [Instalacja](#instalacja)
- [Użycie](#użycie)
- [Skryptu](#skrypty)
- [Konfiguracja](#konfiguracja)
- [Używane biblioteki](#używane-biblioteki)
- [Autor](#autor)
- [Licencja](#licencja)

## Opis projektu

Ten projekt to API backendowe stworzone w celu obsługi [twojego opisu funkcji]. Projekt wykorzystuje TypeScript do zapewnienia statycznego typowania w kodzie źródłowym oraz Node.js jako silnik wykonawczy.

## Wymagania

- Node.js w wersji 14.x lub wyższej
- npm w wersji 6.x lub wyższej

## Instalacja

1. Sklonuj repozytorium:

    ```bash
    git clone https://github.com/twoja-nazwa-uzytkownika/nazwa-projektu.git
    ```

2. Przejdź do katalogu projektu:

    ```bash
    cd nazwa-projektu
    ```

3. Zainstaluj zależności:

    ```bash
    npm install
    ```

## Użycie

1. Aby uruchomić projekt w trybie deweloperskim, użyj:

    ```bash
    npm run dev
    ```

   Lub, aby uruchomić kompilację i uruchomić projekt:

    ```bash
    npm start
    ```

2. Aby kompilować projekt TypeScript do JavaScript, użyj:

    ```bash
    npm run build
    ```

## Skrypty

- **`npm run dev`**: Uruchamia projekt w trybie deweloperskim z automatycznym odświeżaniem (przy użyciu `ts-node-dev`).
- **`npm start`**: Uruchamia skompilowany projekt z folderu `dist`.
- **`npm run build`**: Kompiluje pliki TypeScript do JavaScript w folderze `dist`.

## Konfiguracja

Konfiguracja TypeScript znajduje się w pliku `tsconfig.json`. Możesz dostosować opcje kompilatora, takie jak `target`, `module`, `rootDir`, `outDir` itd.

## Używane biblioteki

- **TypeScript**: Język programowania dla statycznego typowania.
- **Node.js**: Środowisko wykonawcze dla JavaScriptu po stronie serwera.
- **Express**: Minimalistyczny framework webowy dla Node.js.

## Autor

- **Twoje Imię** - [TwojaStronaInternetowa](https://twoja-strona.com)

## Licencja

Ten projekt jest licencjonowany na podstawie [MIT License](LICENSE).