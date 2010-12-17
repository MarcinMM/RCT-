require 'rubygems'
require 'sinatra'
require 'haml'
require 'datamapper'
require 'dm-core'

require 'models'
#require 'helpers'

get '/' do
	@posts = Post.all(:order => [:id.desc], :limit => 20)
	# TODO
	# @page = Page.get(:id => params['pageId'])
    haml :blog
end

get '/game' do
	haml :widget, :layout => :game
end

get '/:name' do
	"Let's get some includes and databases up in here, wot wot wot. Oh yes and #{params[:name]}."
end

post '/' do
	newPost = Post.create(:title => params['blogTitle'], :content => params['blogInput'])
end