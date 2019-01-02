// this is a customized clone of https://github.com/erikkemperman/jquery.ui.emojibutton.git

(function( $, window, undefined ) { // begin plugin

// Survey-optimized weights, due to Joost Broekens but modified (one more feature for brows)
// For each of 9 archetypes: radius of influence, affect (x3), features (x9):
var NUM_FEATURES = 9,
  NUM_ARCHETYPES = 9,
  ARCHETYPES = [
    1.7,       0,   0,   0,        0, -0.5, 0.6,    0,    0,    0,-0.95,  0.1,    1, // 1- neutral
    1.3,      -1,  -1,  -1,       -1,    1,  -1,   -1,    1,   -1,   -1,   -1,    1, // 2 - sad 
    1.3,      -1,  -1,   1,     -0.3,  0.5,   0,    0,   -1,   -1, -0.5, -0.5,    1, // 3 - disgust 
    1.3,      -1,   1,  -1,        1,  0.7,   2, -0.8,  0.8,    0,    0, -0.3,  0.5, // 4 - fear 
    1.3,      -1,   1,   1,      0.5,    1,   1,  0.8, -0.8,    1,    1,   -1,    1, // 5 - anger
    1.3,       1,  -1,  -1,       -1, -0.3,  -1,    0,    0,    0,   -1,  0.7,    1, // 6 - relaxed 
    1.3,       1,  -1,   1,     -0.5, -0.3,   0,    0,    0,    0, -0.5,    1,    1, // 7 - content 
    1.3,       1,   1,  -1,      0.3,   -1,   3,    0,    0, -1.5,  0.7,  0.5, -0.5, // 8 - suprise 
    1.3,       1,   1,   1,      0.5,   -1,   1,    0,    0,    1,  0.5,    1,  0.5, // 9 - happy 
  ],
  
  // ---- custom style defaults: ----
  STYLE_DEFAULTS = {
    "ground": {
      "fill0":         "#FFF",
      "fill1":         "#FFF",
      "stroke":        "#FFF",
      "width":         0
    },
    
    "face": {
      "fill0":         "#FBDF80",
      "fill1":         "#FBDF80",
      "stroke":        "#FBDF80",
      "width":         1,
      "shadow":        "#888",
      "shadowX":       1,
      "shadowY":       2
    },
    
    "brow": {
      "stroke":        "#2A3240",
      "width":         2,
      "shadow":        "#FBDF80",
      "shadowX":       0,
      "shadowY":       0
    },
    
    "eye": {
      "fill0":         "#2A3240",
      "stroke":        "#2A3240",
      "width":         0.5
    },
    
    "iris": {
      "fill0":         "#2A3240",
      "fill1":         "#2A3240",
      "stroke":        "#2A3240",
      "width":         0.5
    },
    
    "pupil": {
      "fill0":         "#2A3240"
    },
    
    "mouth": {
      "fill0":         "#2A3240",
      "fill1":         "#2A3240",
      "stroke":        "#2A3240",
      "width":         2
    },
    
    "teeth": {
      "fill0":         "#fff",
      "shadow":        "#fff",
      "stroke":        "#fff",
      "width":         0.5,
      "grid":          [0.1, 0.25, 0.5, 0.75, 0.9]
    }
  };


$.widget( 'ui.emojibutton', { // begin widget
  
  // ---- Declare user-configurable options with their default values: ----
  options: {
    
    // behavior
    active:           true,
    drag:             typeof $.mobile !== 'undefined',
    offset:           0, // index of initial affect (archetype 0,...,8)
    interval:         40, // (maximum) 25 frames per second
    
    // TODO should these mapping parameters be constants? 
    sensitivity:      1.1,
    sigmoidSteepness: 11,
    sigmoidZero:      8.5,
    swapAD:           false,
    
    // appearance
    smoothing:        true,
    cursor:           'crosshair',
    lineCap:          'round',
    scaleMin:         10,
    scaleMax:         370, // max-min=360 is highly composite
    padding:          10,
    
    style:            STYLE_DEFAULTS
    
  },
  
  
  // ---- Standard widget functions: ----
  
  _create: function() {
    // TODO assert that this.element is a CANVAS and that options have sane values
    var thiz = this,
    k = thiz.options.offset * (4 + NUM_FEATURES),
    element = thiz.element;
    
    // Set up instance state
    $.extend( thiz, {
      state: {
        pleasure:   ARCHETYPES[k + 1],
        arousal:    ARCHETYPES[k + 2],
        dominance:  ARCHETYPES[k + 3]
      },
      features:  ARCHETYPES.slice( k + 4, k + 4 + NUM_FEATURES ),
      width:     0,
      height:    0,
      active:    thiz.options.active,
      repaint:   true,
      down:      false,
      touch:     false,
      context:   element.get( 0 ).getContext( '2d' )
    } );
    
    // if canvas doesn't have width or height attributes, take these from
    // CSS. If you specify both you effectively have different render and
    // display resolution, with asorted scaling artefacts:
    // http://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
    this.element.attr( {
      width: this.element.attr( 'width' ) || element.width(),
      height: this.element.attr( 'height' ) || element.height()
    } );
    
    
    // Apply some of our options here
    this.context.imageSmoothingEnabled = thiz.options.smoothing;
    element.css( 'cursor', thiz.options.cursor );
    
    // Bind event listeners
    $.each( this._eventMap(), function( key, callback ) {
      // When using jQueryMobile, bind to its 'virtual' events
      if ( typeof $.mobile !== 'undefined'
          && ( key === 'mousedown' || key === 'mousemove' || key === 'mouseup' ) ) {
        element.off( key );
        key = 'v' + key;
      }
      element.on( key + '.ui-emojibutton', callback );
    } );
    
  },
  
  _init: function() {
    if ( this.active ) {
      this.active = false;
      this.alive( true );
    } else {
      this.repaint = true;
      this._paint();
    }
  },
  
  destroy: function() {
    this.element.off( '.ui-emojibutton' );
    window.clearTimeout( this.timer );
  },
  
  
  // ---- Public plugin functions: ----
  
  alive: function( active ) {
    if (arguments.length === 0) {
      return this.active;
    }
    active = !!active;
    if ( active !== this.active ) {
      this.active = active;
      if ( active ) {
        this.repaint = true;
        this._paint();
      } else {
        window.clearTimeout( this.timer );
      }
    }
  },
  
  affect: function( affect, value ) {
    var thiz = this;
    switch ( arguments.length ) {
      case 0:
        return $.extend( {}, this.state );
      case 1:
        $.each( affect, function( k, v ) {
          thiz.affect( k, v );
        } );
        break;
      case 2:
        if ( thiz.state.hasOwnProperty( affect ) && !isNaN( value = parseFloat( value ) ) ) {
          thiz.state[affect] = thiz._clip( value );
        }
        break;
      default:
        throw 'too many args'; 
    }
    this.repaint = true;
    if ( ! this.active ) {
      this._paint();
    }
  },
  
  reset: function() {
    this.mouseX = this.mouseY = 0;
    this.affect( {
      pleasure: 0,
      arousal: 0, 
      dominance: 0
    } );
  },
  
  
  // ---- Private plugin functions: ----
  
  _eventMap: function() {
    var thiz = this;
    return {
      'selectstart': false,
      'mouseenter': function() {
        thiz.down = false;
        return false;
      },
      'mouseleave': function() {
        thiz.down = false;
        return false;
      },
      'mousedown': function( event ) {
        thiz.down = true;
        thiz._doMouse( event );
        return false;
      },
      'mousemove': function( event ) {
        thiz._doMouse( event );
        return false;
      },
      'mouseup': function( event ) {
        thiz.down = false;
        thiz._doMouse( event );
        return false;
      },
      'touchstart': function() {
        thiz.touch = true;
      },
      'touchmove': function() {
        if ( thiz.touch ) {
          event.preventDefault();
        }
      },
      'touchend': function() {
        thiz.touch = false;
      }
    };
  },
  
  _doMouse: function( event ) {
    var off;
    if ( this.active && (this.down || ! this.options.drag) ) {
      off = this.element.offset();
      this.mouseX = event.pageX - off.left;
      this.mouseY = event.pageY - off.top;
      this._setXY( 2 * this.mouseX / (this.width - 1) - 1
          , 1 - 2 * this.mouseY / (this.height - 1) );
      if ( this.down ) {
        this.element.trigger( 'affectchanged', [this.affect()] );
      }
    }
  },
  
  _setXY: function( x, y ) {
    var pleasure = this.options.sensitivity * x,
      dominance = this.options.sensitivity * y,
      max = Math.max( Math.abs( pleasure ), Math.abs( dominance ) ),
      arousal = 2.1 / (1 + Math.exp( -(this.options.sigmoidSteepness * max - this.options.sigmoidZero) )) - 1;
    this.affect( {
      pleasure: pleasure,
      arousal: this.options.swapAD ? dominance : arousal,
      dominance: this.options.swapAD ? arousal : dominance
    } );
  },
  
  
  _updateFeatures: function() {
    var i, j, k, v, w, r, d1, d2, d3;
    
    // Set all features to 0
    for ( i = 0; i < NUM_FEATURES; i++ ) {
      this.features[i] = 0;
    }
    
    // We'll need the sum of all weights to normalize at the end
    w = 0;
    
    // For each of the archetypes ...
    for ( j = 0; j < NUM_ARCHETYPES; j++ ) {
      k = j * (4 + NUM_FEATURES);
      
      // ... determine if current PAD is within radius of influence ... 
      if ( (r = ARCHETYPES[k++]) > 0
      && (d1 = Math.abs(this.state.pleasure - ARCHETYPES[k++])) < r
      && (d2 = Math.abs(this.state.arousal - ARCHETYPES[k++])) < r
      && (d3 = Math.abs(this.state.dominance - ARCHETYPES[k++])) < r
      && (v = Math.sqrt(d1*d1 + d2*d2 + d3*d3)) < r ) {
        // ... and if so compute weight as function of distance
        v = r - v;
        // add to the features
        for ( i = 0; i < NUM_FEATURES; i++ ) {
          this.features[i] += v * ARCHETYPES[k++];
        }
        // and increment total sum of weights
        w += v;
      }
    }
    
    // Normalize the features using summed weight
    for ( i = 0; i < NUM_FEATURES; i++ ) {
      this.features[i] /= w;
    }
  },
  
  
  // TODO paint function still waaaay too long, split up further
  _paint: function() {
    var context = this.context, 
      time = Date.now(),
      width = this.element.innerWidth(),
      height = this.element.innerHeight(),
      min = Math.min( width, height ),
      padding = Math.max( 1, this._scale( min, this.options.padding ) ),
      size = Math.max( min - 2*padding, 0 ),
      // TODO explain/rename variables:
      bew, beh, bmw, bmh,
      cx, cy, gx, gy, fx, fy,
      ex, ey, ew, eh,
      bs, bo, bi,
      mx, my, mu, mw, mh, mt, ml,
      tv;
    
    if ( ! (width && height) || ! this.element.is( ':visible' ) ) {
      // widget is not visible - yet? retry a bit later 
      this._repaint( 250 );
      return;
    }
    
    gx = Math.round( (width - size) / 2 );
    gy = Math.round( (height - size) / 2 );
    
    // repaint background if necessary
    if ( width !== this.width || height !== this.height ) {
      $.extend( this, { size: size, width: width, height: height } );
      // background
      this._style( context, size, 'ground', 0, 0, 0, height );
      context.fillRect( 0, 0, width, height );
      context.strokeRect( 0, 0, width, height );
      
      // face
      this._face( context, size, width, height, gx, gy );
      
      this.backdrop = context.getImageData( 0, 0, width, height );
      this.repaint = true;
    }
    
    // repaint features if necessary
    if ( this.repaint ) {
      this.repaint = false;
      context.putImageData( this.backdrop, 0, 0, 0, 0, width, height );
      
      this._updateFeatures();
      
      // 'base' dimensions of eyes and mouth
      bew = size/4;
      beh = size/12;
      bmw = size/2*1.2;
      bmh = size/6*1.2;
      
      // offset to follow mouse cursor
      cx = this._clip( (this.mouseX || width/2) - width/2, -width, width ) / 20;
      cy = this._clip( (this.mouseY || height/2) - height/2, -height, height ) / 20;
      
      // features within face
      fx = cx + gx;
      fy = gy + size/10 - ((this.state.arousal + this.state.dominance) * size/20);
      
      // left eye
      ew = bew;
      eh = (beh * (this.features[0] + 1)) + 1;
      ex = fx + size*(3/20);
      ey = fy + size/3 - eh/2;
      
      // brow (relative to ex,ey)
      bc = (beh * this.features[1]);
      bs = (beh * (this.features[2] + 1)/2) + beh/2 + 1;
      bo = (beh * -this.features[3])/2;
      bi = (beh * -this.features[4])/2;
      
      // mouth
      mw = bmw * (this.features[5] + 1)/6 + bmw/2;
      mh = bmh * (this.features[6] + 1)/3;
      mt = (bmh * this.features[7])/2;
      mx = fx + size/2 - mw/2;
      my = fy + size*(2/3) - mt;
      mu = mh - mt;
      ml = mh + mt;
      
      // teeth
      tv = bmh * (this.features[8] - 1)/3;
      
      // paint eye/brows
      for ( var k = 0; k < 2; k++ ) {
        this._eye( context, size, ex, ey, ew, eh );
        this._brow( context, size, ex, ey, ew, eh, bc, bs, bi, bo, k );
        ex = fx + size * (6/10);
      }
      
      // paint mouth
      // draw shape, fill with teeth color, or shadow if enabled
      this._mouth( context, size, mx, my, mw, mu, ml );
      context.fillStyle = this.options.style.teeth.shadow || this.options.style.teeth.fill0;
      context.fill();
      // clip to mouth shape
      context.save();
      context.clip();
      if ( this.options.style.teeth.shadow ) {
        // if enabled, cover shadow with teeth color 
        this._mouth( context, size, mx + mh/5, my + mh/3, mw, mu, ml );
        context.fillStyle = this.options.style.teeth.fill0;
        context.fill();
      }
      
      // draw the grid of teeth (non-uniform, suggests a bit of a depth?)
      this._style( context, size, 'teeth' );
      $.each( this.options.style.teeth.grid, function( kk, vv ) {
        context.beginPath();
        context.moveTo( mx + vv*mw, Math.min(my, my - mu) );
        context.lineTo( mx + vv*mw, Math.max(my, my + ml) );
        context.closePath();
        context.stroke();
      });
      if ( tv === 0 ) {
        // if teeth clenched, draw line in grid color
        context.moveTo( mx, my + mt );
        context.lineTo( mx + mw, my + mt );
        context.stroke();
      } else {
        // otherwise fill mouth
        this._style( context, size, 'mouth'
            , mx + mw/2, my + mh, mw/6
            , mx + mw/2, my + mh/2, mw/2 );
        context.fillRect( mx, my + mt + tv, mw, -2*tv );
      }
      context.restore();

      // ugly.. need to do mouth shape again to paint lips
      this._mouth( context, size, mx, my, mw, mu, ml );
      this._style( context, size, 'mouth' );
      context.stroke();
    }
    
    // schedule next (potential) repaint
    if ( this.active ) {
      this._repaint( this.options.interval - (Date.now() - time) );
    }
  },
  
  _repaint: function( time ) {
    var thiz = this;
    this.timer = window.setTimeout( function() { thiz._paint(); }, time );
  },
  
  _face: function( context, size, width, height, gx, gy ) {
    context.beginPath();
    context.arc(width/2, height/2, size/2, 0, 2 * Math.PI);
    context.closePath();
    this._style( context, size, 'face', width/2 - size/4, height/2 - size/7, size/4, width/2, height/2, size );
    // this._shadow( context, size, 'face', true );
    context.stroke();
    this._shadow( context );
    context.fill();
  },
  
  _eye: function( context, size, ex, ey, ew, eh ) {
    var eyeHight = eh*3/5
    eyeHight = eyeHight < 12 ? 12 : eyeHight;
    eyeHight = eyeHight > 20 ? 20 : eyeHight;
    context.beginPath();
    context.ellipse(ex+ew/2, ey+eyeHight/2, 12, eyeHight, 0, 0, 2 * Math.PI);
    context.closePath();
    this._style( context, size, 'eye' );
    context.fill();
    context.stroke();
  },
  
  _brow: function( context, size, ex, ey, ew, eh, bc, bs, bi, bo, k ) {
    let x1 = ex;
    let y1 = ey + eh/2 - bs + (k ? bi : bo) - (bi-bo)/8;
    let x2 = ex + ew;
    let y2 = ey + eh/2 - bs + (k ? bo : bi);
    let xm = (x1 + x2) / 2;
    let ym = Math.min(y1, y2) + bc;
    context.beginPath();
    context.moveTo( x1, y1 );
    context.bezierCurveTo( 
      k ? xm : x1, k ? ym : y1,
      k ? x2 : xm, k ? y2 : ym,
      x2, y2
    );
    // context.closePath();
    this._shadow( context, size, 'brow', true );
    this._style( context, size, 'brow' );
    context.stroke();
    this._shadow( context );
  },
  
  _mouth: function( context, size, mx, my, mw, up, lo ) {
    context.beginPath();
    context.moveTo( mx, my );
    context.bezierCurveTo( mx, my - up/2, mx + mw/4, my - up, mx + mw/2, my - up );
    context.bezierCurveTo( mx + mw - mw/4, my - up, mx + mw, my - up/2, mx + mw, my );
    context.bezierCurveTo( mx + mw, my + lo/2, mx + mw - mw/4, my + lo, mx + mw/2, my + lo );
    context.bezierCurveTo( mx + mw/4, my + lo, mx, my + lo/2, mx, my );
    context.closePath();
  },
  
  _shadow: function( context, size, item, blur ) {
    if ( arguments.length === 1 ) {
      context.shadowColor = '';
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    } else {
      context.shadowColor = this.options.style[item].shadow;
      context.shadowOffsetX = this._scale( size, this.options.style[item].shadowX );
      context.shadowOffsetY = this._scale( size, this.options.style[item].shadowY );
      context.shadowBlur = blur ? context.shadowOffsetX + context.shadowOffsetY : 0;
    }
  },
  
  _style: function( context, size, item ) {
    var color0 = this.options.style[item].fill0,
      color1 = this.options.style[item].fill1 || color0,
      gradient;
    context.lineWidth = this._scale( size, this.options.style[item].width );
    context.strokeStyle = this.options.style[item].stroke;
    if ( arguments.length > 3 && color0 !== color1 ) {
      gradient = context['create' + (arguments.length > 7 ? 'Radial' : 'Linear') + 'Gradient']
          .apply( context, Array.prototype.slice.call( arguments, 3 ) );
      gradient.addColorStop( 0, color0 );
      gradient.addColorStop( 1, color1 );
    } else {
      gradient = color0;
    }
    context.fillStyle = gradient;
  },
  
  _scale: function( size, factor ) {
    size = this._clip( size, this.options.scaleMin, this.options.scaleMax );
    return (size * factor) / 100;
  },
  
  _clip: function( value, min, max ) {
    min = min || -1;
    max = max || 1;
    return value < min ? min : value > max ? max : value;
  }

} ); // end widget

} )( jQuery, this ); // end plugin
