require 'rubygems'
require 'sinatra'
require 'dm-core'

DataMapper.setup(:default, 'mysql://localhost/rctdash')

set :static, true
require 'wut'
run Sinatra::Application