require 'sinatra'

get '/' do
	"Yes may I help you?"
end
get '/:name' do
	"Let's get some includes and databases up in here, wot wot. Oh yes and #{params[:name]}."
end
