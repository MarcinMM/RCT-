require 'datamapper'
require 'dm-core'

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
