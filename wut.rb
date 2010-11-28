require 'rubygems'
require 'sinatra'
require 'haml'
require 'datamapper'

#require 'models'
#require 'helpers'

DataMapper.setup(:default, {
  :adapter => 'mysql',
  :database => 'rctdash',
  :username => 'rct',
  :password => 'rct',
  :host => 'localhost'
})

get '/' do
    haml :blog
end

get '/game' do
	haml :widget, :layout => :game
end

get '/:name' do
	"Let's get some includes and databases up in here, wot wot wot. Oh yes and #{params[:name]}."
end
