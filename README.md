# spop web

Best libSpotify player for the browser suitable for small devices. spop web is
a web interface to [spop](https://github.com/Schnouki/spop) (Spotify client
daemon) as **Advance Spotify Player for [Raspberry
Pi](https://www.raspberrypi.org)** (alternative to
[Volumio](https://volumio.org) or [Rune Audio](http://www.runeaudio.com) UI).

## Features

* Play queue with play, pause, next, and previous
* List and playback of your playlists
* Search tracks, albums, and artists via search or context menu
* Browse tracks, albums, and similar artists from an artists
* Play and append tracks or albums to the play queue
* Cover art on tracks and albums
* Mobile friendly e.g. long press on the cover starts playback of track or album
* Multipe device support: updates are shown on all connected devices

## Requirements

* Node >= 0.10
* Running spop daemon (e.g. via Volumio or RuneAudio)

Install node via your package manager. To install spop, please see its own
[project site](https://github.com/Schnouki/spop).

If you run spop web on a Raspberry Pi it is also recommended to have an I2C DAC
like HiFi Berry.

## Installation

    $ npm install -g bower gulp-cli
    $ npm install
    $ bower install
    $ gulp

spop web uses:

* [Bootstrap](http://getbootstrap.com)
* [FontAwesome](http://fontawesome.io)
* [AngularJS](http://angularjs.org)
* [AngularStrap](http://mgcrea.github.io/angular-strap)
* [Express](http://expressjs.com)

## Run

    $ node index.js

Open your browser at [localhost:3000](http://localhost:3000)

## With Docker

If you don't want to install Node / Bower / Gulp on your local machine, you can
do all of that in a Docker container:

    $ docker build -t spop-web .
    $ docker run -ti -p 3000:3000 --net=host --rm spop-web

Then open your browser at [localhost:3000](http://localhost:3000).

## Contribute

Contributions are welcome. To do so, please:

* fork this project
* create a brunch for your contribution
* submit a pull request

## Note on libspotify

[libspotify](https://developer.spotify.com/technologies/libspotify) is
deprecated since May 2015 and projects like spop and spop-web are doomed. Lets
hope that the libspotify functionality lives long! Read blog entry [Do not use
libspotify](https://jonaslundqvist.net/2015/05/06/do-not-use-libspotify/) from
Jonas Lundqvist.

We all hope that the deprecated libspotify will playback for a long time.

## Licence

MIT
