
define(function () {
    return {
        stop: 0,
        dirX: 1,
        dirY: 2,
        keyStop: 0,
        wall: [],
        wallSize: 0,
        
        init: function() {
            this.paper = Raphael("container", 300, 400);
            var background = this.paper.rect(0, 0, 320, 400);
            background.attr( "fill", "black");
            
            // ball
            this.c = this.paper.circle(50, 100, 7);
            this.c.attr("stroke", "white");
            this.c.attr("fill", "yellow");
            
            // paddle
            this.paddle = this.paper.rect(120, 380, 50, 10);
            this.paddle.attr("stroke", "white");
            this.paddle.attr("fill", "fuchsia");
            
            // bricks, for now just a 4 layer long wall
            // get some randomization in here later?
            var brick;
            for (var y = 1; y <= 4; y++) {
                for (var i = 1; i < 14; i++) {
                    brick = this.paper.rect((i * 20),((y * 10) + 20), 20, 10);
                    brick.attr("stroke","white");
                    brick.attr("fill","cyan");
                    this.wall[this.wallSize] = brick;
                    this.wallSize += 1;
                }
            }
            
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
                _this.stop = 1;
                $.doTimeout('loopId');
            });
            
            $('#restartButton').click(function(event) {
                _this.c.translate(0,-300);
                _this.stop = 0;
                _this.loop();
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
            if (cX > 293 || cX < 7) {
                this.dirX = -this.dirX;
            }
            if (cY > 393 || cY < 7) {
                this.dirY = -this.dirY;
            }
            
            // paddle collision
            // only bother checking if at low edge
            // need to add variable speed depending on fraction of bar hit to vary this up a bit
            // for first pass 3 sections - middle just reflects, sides add some multiplier?
            if (cY >= 380) {
                //this.dirY = -this.dirY; // for debugging wall collision
                var paddleHit = cX - this.paddle.attrs.x;
                if ( paddleHit <= 50 && paddleHit >= 0) {
                    // 5 quadrants
                    if (paddleHit > 43) {
                        this.dirX = 3;
                        this.dirY = 1;
                    } else if (paddleHit < 7) {
                        this.dirX = -3;
                        this.dirY = 1;
                    } else if (paddleHit > 20 && paddleHit <=25) {
                        this.dirX = -1;
                        this.dirY = 2;
                    } else if (paddleHit > 25 && paddleHit <= 30) {
                        this.dirX = 1;
                        this.dirY = 2;
                    } else {
                        this.dirY = 2;
                        this.dirX = 2;
                    }
                    this.dirY = -this.dirY;
                } else {
                    $('#messages').html('Game over? Gotta get a restart in here.');
                    $('#restartButton').show();
                    var fin = this.paper.text(100,200, "Oh noes!");
                    fin.attr("font-size", "20");
                    fin.attr("font-weight", "bold");
                    fin.attr("fill", "red");
                    $.doTimeout('loopId');
                    this.stop = 1; 
                }
            }
            
            // wall collision
            // iterate through bricks checking all 4 sides (yikes)
            // only start checking above a certain height
            // we should be able to optimize this later by splitting the wall into rows, each checked at a certain height only
            if (cY <= 84) {
                for (var i = 0; i < this.wallSize; i++) {
                    var brick = this.wall[i];
                    if (brick.removed != true) {
                        var xDiff = cX - brick.attrs.x;
                        var yDiff = cY - brick.attrs.y;
                        // check bounds of brick (and ball) on all sides; ball is treated as rectangle for ease of calculation
                        if ( ((xDiff <= 27) && (xDiff >= -7)) && ((yDiff >= -7) && (yDiff <= 17)) ) {
                            // impact; now the decision point is which side we impacted on
                            // can this be optimized? does it have to be? it's just a bunch of simple math checks
                            // finally, we only want one direction change (deltaV) to occur
                            var deltaVFlag = 0;
                            // impact on top +-1px; only change speed upwards
                            if (!deltaVFlag && (yDiff >= -8 && yDiff <= -6) && (this.dirY > 0)) {
                                this.dirY = -this.dirY;
                                deltaVFlag = 1;
                                console.log('top');
                                brick.remove();
                            }
                            // impact on bottom +1px; only change speed downwards
                            if (!deltaVFlag && (yDiff >= 16 && yDiff <= 18) && (this.dirY < 0)) {
                                this.dirY = -this.dirY;
                                deltaVFlag = 1;
                                console.log('bottom');
                                brick.remove();
                            }
                            // impact on left; only change speed to the right
                            if (!deltaVFlag && (xDiff == -7) && (this.dirX > 0)) {
                                this.dirX = -this.dirX;
                                deltaVFlag = 1;
                                console.log('left');
                                brick.remove();
                            }
                            // impact on right; only change speed left
                            if (!deltaVFlag && (xDiff == 27) && (this.dirX < 0)) {
                                this.dirX = -this.dirX;
                                deltaVFlag = 1;
                                console.log('right');
                                brick.remove();
                            }
                        }
                    }
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
