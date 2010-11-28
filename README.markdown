# Ruby CMS experiment. Thing.

Manage your content, unicorn style.

## Installation

RCT! requires:

- [DataMapper](http://datamapper.org) to talk MySQL
- [Sinatra](http://sinatrarb.com) to talk HTTP
- [Haml](http://haml-lang.com/) to talk HTML

You can install them with gem:

    sudo gem install datamapper do_mysql haml sinatra

## Usage

You can run the app locally using Sinatra:

    $ ruby wut.rb
    == Sinatra/0.9.4 has taken the stage on 4567 for development with backup from Mongrel

## Alternate usage

You should probably install shotgun and rack now that I've added a rack file (config.ru).

	sudo gem install shotgun rack

Then you can run the app (on OSX) with:

	$ shotgun -p 4567 -s thin -o 0.0.0.0 wut.rb

or maybe just this will work for you:

	$ shotgun wut.rb

And reload the page to view code changes without having to restart Sinatra.
