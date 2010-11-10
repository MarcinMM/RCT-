
define(function () {
    return {
        stop: 0,
        speed: 2,
        dirX: 2,
        dirY: 2,
        keyStop: 0,
        
        init: function() {
            this.paper = Raphael("container", 300, 400);
            var background = this.paper.rect(0, 0, 320, 400);
            background.attr( "fill", "black");
            
            this.c = this.paper.circle(50, 50, 7);
            this.c.attr("stroke", "white");
            this.c.attr("fill", "yellow");
            
            this.paddle = this.paper.rect(120, 380, 50, 10);
            this.paddle.attr("stroke", "white");
            this.paddle.attr("fill", "fuchsia");
            
            var _this = this;
            
            $(window).keydown(function(event) {
                if (!_this.stop) {
                    var key = event.keyCode;
                    if (key == 39) {
                        _this.right();
                    } else if (key == 37) {
                        _this.left();
                    }
                    if (key == 32) {
                        console.log('pew pew');
                    }
                }
            });
            
            $(window).keyup(function(event) {
                _this.keyStop = 1;
                $.doTimeout('moveRId');
                $.doTimeout('moveLId');
            })
            
            $('#stopButton').click(function(event) {
                this.stop = 1;
                $.doTimeout('loopId');
            });
            
            // start animation
            this.loop();
        },
    
        right: function() {
            var _this = this;
            $.doTimeout('moveRId', 1, function() {
                _this.paddle.translate(1, 0);
                return true;
            });
        },
        
        left: function() {
            var _this = this;
            $.doTimeout('moveLId', 1, function() {
                _this.paddle.translate(-1, 0);
                return true;
            });
        },
    
        draw: function() {
            var cX = this.c.attrs.cx;
            var cY = this.c.attrs.cy;
            if (cX > 293) {
                this.dirX = -this.speed;
            } else if (cX < 7) {
                this.dirX = this.speed;
            }
            if (cY > 393) {
                this.dirY = -this.speed;
            } else if (cY < 7) {
                this.dirY = this.speed;
            }
            
            // paddle collision
            // only bother checking if at low edge
            if (cY >= 380) {
                if ( (cX > this.paddle.attrs.x) && (cX < this.paddle.attrs.x + 50) ) {
                    this.dirY = -this.speed;
                } else {
                    console.log('miss');
                    var fin = this.paper.text(100,200, "Oh noes!");
                    fin.attr("font-size", "20");
                    fin.attr("font-weight", "bold");
                    fin.attr("fill", "red");
                    $.doTimeout('loopId');
                    this.stop = 1;
                }
            }
            
            this.c.translate(this.dirX,this.dirY);
        },
    
        loop: function() {
            var _this = this;
            $.doTimeout('loopId', 1, function() {
                _this.draw();
                if (_this.stop == 1) {
                    console.log('stop');
                    return false;
                }
                return true;
            });
        }
    }
});
