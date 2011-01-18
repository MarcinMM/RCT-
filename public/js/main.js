require([
            "js/raphael.js",
            "js/doTimeout.js",
            "js/underscore-dev.js",
            "js/backbone-dev.js",
            "js/jquery-form.js",
            "js/jquery-ui-1.8.8.custom.min.js"
        ],
        function() {
            // blog "class"
			$('#submit').click(function() { 
				// submit the form 
				var options = {
					dataType: 'json'
				};
				$('#blogForm').ajaxSubmit(options); 
				// TODO - use backbone for the below instead of the crudeness above
				// Blog.submitUpdate();
				// Blog.refreshView();
				// return false to prevent normal browser submit and page navigation 
			});

			// Tentative TODO:
			// Backbone views may be a bit much to deal with
			// while learning ruby and haml as well
			// we shall use Models to get at least a semblance of OO, however
			// models will use ajaxsubmit to talk to DB though
			// and html manipulation to refresh page
            var Blog = Backbone.Model.extend({
                blogTest : 'scopeTest',

                addEntry: function() {
                    //alert('add' + this.blogTest + this.blogTest2);
                },
                addTag: function() {
                    
                }
            });
            
            var blog = new Blog( { blogTest2: 'inited var' });
            blog.addEntry();

            $('.boxenColumn').sortable({ connectWith: '.boxenColumn', forcePlaceholderSize: true, placeholder: 'ui-drag-outline' });
            //alert(blog.blogTest);
            //alert(blog.get('blogTest2'));
            
    });