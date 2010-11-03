require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
	haml :widget
end

get '/:name' do
	"Let's get some includes and databases up in here, wot wot. Oh yes and #{params[:name]}."
end
