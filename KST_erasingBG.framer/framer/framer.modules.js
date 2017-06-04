require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Pointer":[function(require,module,exports){
exports.Pointer = (function() {
  var clientCoords, coords, offsetArgumentError, offsetCoords, screenArgumentError;

  function Pointer() {}

  Pointer.screen = function(event, layer) {
    var e, screenCoords;
    if (!((event != null) && (layer != null))) {
      screenArgumentError();
    }
    e = offsetCoords(event);
    if (e.x && e.y) {
      screenCoords = layer.screenFrame;
      e.x += screenCoords.x;
      e.y += screenCoords.y;
    } else {
      e = clientCoords(event);
    }
    return e;
  };

  Pointer.offset = function(event, layer) {
    var e, targetScreenCoords;
    if (!((event != null) && (layer != null))) {
      offsetArgumentError();
    }
    e = offsetCoords(event);
    if (!((e.x != null) && (e.y != null))) {
      e = clientCoords(event);
      targetScreenCoords = layer.screenFrame;
      e.x -= targetScreenCoords.x;
      e.y -= targetScreenCoords.y;
    }
    return e;
  };

  offsetCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.offsetX, e.offsetY);
  };

  clientCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.clientX, e.clientY);
  };

  coords = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  screenArgumentError = function() {
    error(null);
    return console.error("Pointer.screen() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.screen(event, layer)");
  };

  offsetArgumentError = function() {
    error(null);
    return console.error("Pointer.offset() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.offset(event, layer)");
  };

  return Pointer;

})();


},{}],"SVGLayer":[function(require,module,exports){
"SVGLayer class\n\nproperties\n- linecap <string> (\"round\" || \"square\" || \"butt\")\n- fill <string> (css color)\n- stroke <string> (css color)\n- strokeWidth <number>\n- dashOffset <number> (from -1 to 1, defaults to 0)";
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.SVGLayer = (function(superClass) {
  extend(SVGLayer, superClass);

  function SVGLayer(options) {
    var cName, d, footer, header, path, t;
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      dashOffset: 1,
      strokeWidth: 2,
      stroke: "#28affa",
      backgroundColor: null,
      clip: false,
      fill: "transparent",
      linecap: "round"
    });
    SVGLayer.__super__.constructor.call(this, options);
    if (options.fill === null) {
      this.fill = null;
    }
    this.width += options.strokeWidth / 2;
    this.height += options.strokeWidth / 2;
    d = new Date();
    t = d.getTime();
    cName = "c" + t;
    header = "<svg class='" + cName + "' x='0px' y='0px' width='" + this.width + "' height='" + this.height + "' viewBox='-" + (this.strokeWidth / 2) + " -" + (this.strokeWidth / 2) + " " + (this.width + this.strokeWidth / 2) + " " + (this.height + this.strokeWidth / 2) + "'>";
    path = options.path;
    footer = "</svg>";
    this.html = header + path + footer;
    Utils.domComplete((function(_this) {
      return function() {
        var domPath;
        domPath = document.querySelector('.' + cName + ' path');
        _this._pathLength = domPath.getTotalLength();
        _this.style = {
          "stroke-dasharray": _this.pathLength
        };
        return _this.dashOffset = options.dashOffset;
      };
    })(this));
  }

  SVGLayer.define("pathLength", {
    get: function() {
      return this._pathLength;
    },
    set: function(value) {
      return print("SVGLayer.pathLength is readonly");
    }
  });

  SVGLayer.define("linecap", {
    get: function() {
      return this.style.strokeLinecap;
    },
    set: function(value) {
      return this.style.strokeLinecap = value;
    }
  });

  SVGLayer.define("strokeLinecap", {
    get: function() {
      return this.style.strokeLinecap;
    },
    set: function(value) {
      return this.style.strokeLinecap = value;
    }
  });

  SVGLayer.define("fill", {
    get: function() {
      return this.style.fill;
    },
    set: function(value) {
      if (value === null) {
        value = "transparent";
      }
      return this.style.fill = value;
    }
  });

  SVGLayer.define("stroke", {
    get: function() {
      return this.style.stroke;
    },
    set: function(value) {
      return this.style.stroke = value;
    }
  });

  SVGLayer.define("strokeColor", {
    get: function() {
      return this.style.stroke;
    },
    set: function(value) {
      return this.style.stroke = value;
    }
  });

  SVGLayer.define("strokeWidth", {
    get: function() {
      return Number(this.style.strokeWidth.replace(/[^\d.-]/g, ''));
    },
    set: function(value) {
      return this.style.strokeWidth = value;
    }
  });

  SVGLayer.define("dashOffset", {
    get: function() {
      return this._dashOffset;
    },
    set: function(value) {
      var dashOffset;
      this._dashOffset = value;
      if (this.pathLength != null) {
        dashOffset = Utils.modulate(value, [0, 1], [this.pathLength, 0]);
        return this.style.strokeDashoffset = dashOffset;
      }
    }
  });

  return SVGLayer;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL05hdmVyL0Rlc2t0b3AvdGVtcF9GcmFtZXIvS1NUX2VyYXNpbmdCRy5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9OYXZlci9EZXNrdG9wL3RlbXBfRnJhbWVyL0tTVF9lcmFzaW5nQkcuZnJhbWVyL21vZHVsZXMvU1ZHTGF5ZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvTmF2ZXIvRGVza3RvcC90ZW1wX0ZyYW1lci9LU1RfZXJhc2luZ0JHLmZyYW1lci9tb2R1bGVzL1BvaW50ZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiXCJcIlwiXG5TVkdMYXllciBjbGFzc1xuXG5wcm9wZXJ0aWVzXG4tIGxpbmVjYXAgPHN0cmluZz4gKFwicm91bmRcIiB8fCBcInNxdWFyZVwiIHx8IFwiYnV0dFwiKVxuLSBmaWxsIDxzdHJpbmc+IChjc3MgY29sb3IpXG4tIHN0cm9rZSA8c3RyaW5nPiAoY3NzIGNvbG9yKVxuLSBzdHJva2VXaWR0aCA8bnVtYmVyPlxuLSBkYXNoT2Zmc2V0IDxudW1iZXI+IChmcm9tIC0xIHRvIDEsIGRlZmF1bHRzIHRvIDApXG5cIlwiXCJcblxuY2xhc3MgZXhwb3J0cy5TVkdMYXllciBleHRlbmRzIExheWVyXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0b3B0aW9ucyA9IF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGRhc2hPZmZzZXQ6IDFcblx0XHRcdHN0cm9rZVdpZHRoOiAyXG5cdFx0XHRzdHJva2U6IFwiIzI4YWZmYVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRmaWxsOiBcInRyYW5zcGFyZW50XCJcblx0XHRcdGxpbmVjYXA6IFwicm91bmRcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdGlmIG9wdGlvbnMuZmlsbCA9PSBudWxsXG5cdFx0XHRAZmlsbCA9IG51bGxcblxuXHRcdEB3aWR0aCArPSBvcHRpb25zLnN0cm9rZVdpZHRoIC8gMlxuXHRcdEBoZWlnaHQgKz0gb3B0aW9ucy5zdHJva2VXaWR0aCAvIDJcblxuXHRcdCMgSFRNTCBmb3IgdGhlIFNWRyBET00gZWxlbWVudCwgbmVlZCB1bmlxdWUgY2xhc3MgbmFtZXNcblx0XHRkID0gbmV3IERhdGUoKVxuXHRcdHQgPSBkLmdldFRpbWUoKVxuXHRcdGNOYW1lID0gXCJjXCIgKyB0XG5cdFx0aGVhZGVyID0gXCI8c3ZnIGNsYXNzPScje2NOYW1lfScgeD0nMHB4JyB5PScwcHgnIHdpZHRoPScje0B3aWR0aH0nIGhlaWdodD0nI3tAaGVpZ2h0fScgdmlld0JveD0nLSN7QHN0cm9rZVdpZHRoLzJ9IC0je0BzdHJva2VXaWR0aC8yfSAje0B3aWR0aCArIEBzdHJva2VXaWR0aC8yfSAje0BoZWlnaHQgKyBAc3Ryb2tlV2lkdGgvMn0nPlwiXG5cdFx0cGF0aCA9IG9wdGlvbnMucGF0aFxuXHRcdGZvb3RlciA9IFwiPC9zdmc+XCJcblx0XHRAaHRtbCA9IGhlYWRlciArIHBhdGggKyBmb290ZXJcblxuXHRcdCMgd2FpdCB3aXRoIHF1ZXJ5aW5nIHBhdGhsZW5ndGggZm9yIHdoZW4gZG9tIGlzIGZpbmlzaGVkXG5cdFx0VXRpbHMuZG9tQ29tcGxldGUgPT5cblx0XHRcdGRvbVBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJytjTmFtZSsnIHBhdGgnKVxuXHRcdFx0QF9wYXRoTGVuZ3RoID0gZG9tUGF0aC5nZXRUb3RhbExlbmd0aCgpXG5cdFx0XHRAc3R5bGUgPSB7XCJzdHJva2UtZGFzaGFycmF5XCI6QHBhdGhMZW5ndGg7fVxuXHRcdFx0QGRhc2hPZmZzZXQgPSBvcHRpb25zLmRhc2hPZmZzZXRcblxuXHRAZGVmaW5lIFwicGF0aExlbmd0aFwiLFxuXHRcdGdldDogLT4gQF9wYXRoTGVuZ3RoXG5cdFx0c2V0OiAodmFsdWUpIC0+IHByaW50IFwiU1ZHTGF5ZXIucGF0aExlbmd0aCBpcyByZWFkb25seVwiXG5cblx0QGRlZmluZSBcImxpbmVjYXBcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5zdHJva2VMaW5lY2FwXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAc3R5bGUuc3Ryb2tlTGluZWNhcCA9IHZhbHVlXG5cblx0QGRlZmluZSBcInN0cm9rZUxpbmVjYXBcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5zdHJva2VMaW5lY2FwXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAc3R5bGUuc3Ryb2tlTGluZWNhcCA9IHZhbHVlXG5cblx0QGRlZmluZSBcImZpbGxcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5maWxsXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRpZiB2YWx1ZSA9PSBudWxsXG5cdFx0XHRcdHZhbHVlID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRAc3R5bGUuZmlsbCA9IHZhbHVlXG5cblx0QGRlZmluZSBcInN0cm9rZVwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnN0cm9rZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc3R5bGUuc3Ryb2tlID0gdmFsdWVcblxuXHRAZGVmaW5lIFwic3Ryb2tlQ29sb3JcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5zdHJva2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHN0eWxlLnN0cm9rZSA9IHZhbHVlXG5cblx0QGRlZmluZSBcInN0cm9rZVdpZHRoXCIsXG5cdFx0Z2V0OiAtPiBOdW1iZXIoQHN0eWxlLnN0cm9rZVdpZHRoLnJlcGxhY2UoL1teXFxkLi1dL2csICcnKSlcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBzdHlsZS5zdHJva2VXaWR0aCA9IHZhbHVlXG5cblx0QGRlZmluZSBcImRhc2hPZmZzZXRcIixcblx0XHRnZXQ6IC0+IEBfZGFzaE9mZnNldFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9kYXNoT2Zmc2V0ID0gdmFsdWVcblx0XHRcdGlmIEBwYXRoTGVuZ3RoP1xuXHRcdFx0XHRkYXNoT2Zmc2V0ID0gVXRpbHMubW9kdWxhdGUodmFsdWUsIFswLCAxXSwgW0BwYXRoTGVuZ3RoLCAwXSlcblx0XHRcdFx0QHN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBkYXNoT2Zmc2V0XG4iLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlZCBieSBKb3JkYW4gUm9iZXJ0IERvYnNvbiBvbiAxNCBBdWd1c3QgMjAxNVxuIyBcbiMgVXNlIHRvIG5vcm1hbGl6ZSBzY3JlZW4gJiBvZmZzZXQgeCx5IHZhbHVlcyBmcm9tIGNsaWNrIG9yIHRvdWNoIGV2ZW50cy5cbiNcbiMgVG8gR2V0IFN0YXJ0ZWQuLi5cbiNcbiMgMS4gUGxhY2UgdGhpcyBmaWxlIGluIEZyYW1lciBTdHVkaW8gbW9kdWxlcyBkaXJlY3RvcnlcbiNcbiMgMi4gSW4geW91ciBwcm9qZWN0IGluY2x1ZGU6XG4jICAgICB7UG9pbnRlcn0gPSByZXF1aXJlIFwiUG9pbnRlclwiXG4jXG4jIDMuIEZvciBzY3JlZW4gY29vcmRpbmF0ZXM6IFxuIyAgICAgYnRuLm9uIEV2ZW50cy5DbGljaywgKGV2ZW50LCBsYXllcikgLT4gcHJpbnQgUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVxuIyBcbiMgNC4gRm9yIGxheWVyIG9mZnNldCBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLm9mZnNldChldmVudCwgbGF5ZXIpXG4jXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuY2xhc3MgZXhwb3J0cy5Qb2ludGVyXG5cblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgUHVibGljIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cdEBzY3JlZW4gPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdHNjcmVlbkFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0aWYgZS54IGFuZCBlLnlcblx0XHRcdCMgTW91c2UgRXZlbnRcblx0XHRcdHNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggKz0gc2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSArPSBzY3JlZW5Db29yZHMueVxuXHRcdGVsc2Vcblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRyZXR1cm4gZVxuXHRcdFx0XG5cdEBvZmZzZXQgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdG9mZnNldEFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0dW5sZXNzIGUueD8gYW5kIGUueT9cblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRcdHRhcmdldFNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggLT0gdGFyZ2V0U2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSAtPSB0YXJnZXRTY3JlZW5Db29yZHMueVxuXHRcdHJldHVybiBlXG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQcml2YXRlIEhlbHBlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRvZmZzZXRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5vZmZzZXRYLCBlLm9mZnNldFlcblx0Y2xpZW50Q29vcmRzID0gKGV2KSAgLT4gZSA9IEV2ZW50cy50b3VjaEV2ZW50IGV2OyByZXR1cm4gY29vcmRzIGUuY2xpZW50WCwgZS5jbGllbnRZXG5cdGNvb3JkcyAgICAgICA9ICh4LHkpIC0+IHJldHVybiB4OngsIHk6eVxuXHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgRXJyb3IgSGFuZGxlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcblx0c2NyZWVuQXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLnNjcmVlbigpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVwiXCJcIlxuXHRcdFx0XG5cdG9mZnNldEFyZ3VtZW50RXJyb3IgPSAtPlxuXHRcdGVycm9yIG51bGxcblx0XHRjb25zb2xlLmVycm9yIFwiXCJcIlxuXHRcdFx0UG9pbnRlci5vZmZzZXQoKSBFcnJvcjogWW91IG11c3QgcGFzcyBldmVudCAmIGxheWVyIGFyZ3VtZW50cy4gXFxuXG5cdFx0XHRFeGFtcGxlOiBsYXllci5vbiBFdmVudHMuVG91Y2hTdGFydCwoZXZlbnQsbGF5ZXIpIC0+IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcIlwiXCIiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUdBQTtBRG9CTSxPQUFPLENBQUM7QUFLYixNQUFBOzs7O0VBQUEsT0FBQyxDQUFBLE1BQUQsR0FBVSxTQUFDLEtB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
