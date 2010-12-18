require 'datamapper'
require 'dm-core'
require 'dm-migrations'

DataMapper::Logger.new($stdout, :debug)

DataMapper.setup(:default, {
  :adapter => 'mysql',
  :database => 'rctdash',
  :username => 'rct',
  :password => 'rct',
  :host => 'localhost'
})

class Post
   include DataMapper::Resource
   
   property :id, Serial
   property :created_at, DateTime
   property :title, Text
   property :content, Text
   property :contentFull, Text
   
   has n, :tags
end

class Tag
   include DataMapper::Resource
   
   property :id, Serial
   property :tagText, Text
   
   belongs_to :post
end


# Basic unit of a site
class Page
  include DataMapper::Resource
  
  property :id, Serial
  property :canonical, Text
  
  has 1, :layout
end

# This defines a specific configuration of modules on a page; could also be called a theme
# - A front page might consist of a blog module, an rss feed and a chatbox
# - An archives page might consist of archived blog posts module, a gallery, and a box of text with "About" type text
# - A gallery page might consist solely of a gallery module, etc.
class Layout
  include DataMapper::Resource
  
  property :id, Serial
  property :name, Text
  
  has n, :boxs
  belongs_to :page
end

# This is a unit of layout, containing positional data and nothing else
# It is function agnostic and calls the type function when activated by layout manager
class Box
  include DataMapper::Resource
  
  property :id, Serial
  property :location, Text
  property :order, Integer
  
  has 1, :box_type
  belongs_to :layout
end

# This is a unit of function, containing further instructions to the app on how to interact with the site
# It is layout-agnostic, and simply executes by id when called
class BoxType
  include DataMapper::Resource
  
  property :id, Serial
  property :type, Text
  
  belongs_to :box
end


DataMapper.auto_migrate!
