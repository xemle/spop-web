# spop web

Web interface to [spop](https://github.com/Schnouki/spop) (Spotify client daemon) as
**Advance Spotify Player for [Raspberry Pi](https://www.raspberrypi.org)** (alternative
to [Volumio](https://volumio.org) or [Rune Audio](http://www.runeaudio.com) UI).

**Note**: [libspotify](https://developer.spotify.com/technologies/libspotify) is
deprecated since May 2015 and projects like spop and spop-web are doomed. Lets
hope that the libspotify functionality lives long! Read blog entry
[Do not use libspotify](https://jonaslundqvist.net/2015/05/06/do-not-use-libspotify/)
from Jonas Lundqvist.

## Requirements

* Node >= 0.10
* Running spop daemon (e.g. via Volumio or RuneAudio)

## Installation

    $ npm install -g bower gulp-cli
    $ npm install
    $ bower install

## Run

    $ node index.js

Open your browser at [http://localhost:3000](http://localhost:3000)