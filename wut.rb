require 'sinatra'
require 'haml'

get '/' do
	"Yes may I help you?"
	haml :widget
end
get '/:name' do
	"Let's get some includes and databases up in here, wot wot. Oh yes and #{params[:name]}."
end
