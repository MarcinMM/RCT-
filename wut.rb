require 'rubygems'
require 'sinatra'
require 'haml'
require 'datamapper'

DataMapper.setup(:default, 'mysql://localhost/rctdash')

get '/' do
    haml :blog
end

get '/game' do
	haml :widget, :layout => :game
end

get '/:name' do
	"Let's get some includes and databases up in here, wot wot. Oh yes and #{params[:name]}."
end
