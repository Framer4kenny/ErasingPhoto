#check
# {Pointer} = require 'Pointer'
Pointer = require "Pointer"

area = new Layer
	width:  Screen.width
	height: Screen.height
	backgroundColor: "purple"

profileWrapper = new Layer
	width: 400
	height: 400
	borderRadius: 200
	parent: area
	clip: true
	
profileArea = new Layer
	width: 400
	height: 400
	parent: profileWrapper
	clip: true

profileWrapper.center()

#profile 1
profile1 = new Layer
	width: 400
	height: 400
	backgroundColor: ""
	parent: profileArea

profile1Img = new Layer
	width: 400
	height: 400
# 	image: "images/family01.png"
	backgroundColor: "aqua"
	parent: profile1

#check	
svg = new Layer  
	width: Screen.width
	height: Screen.height
	x: -profileWrapper.x
	y: -profileWrapper.y
	backgroundColor: "#fff"
	html: '<svg id="svg" style="position: absolute; box-shadow: inset 0 0 0 1px white;" width="100%" height="100%" viewbox="0 0 #{Screen.width} #{Screen.height}"></svg>'
	style: 
		fill:   'none'
		stroke: '#000'
		strokeWidth: '50'
		strokeLinecap: 'round'
		mixBlendMode: "screen"
	custom:
		polyline: null
		svg: null
		active: false			
	parent: profile1

# Profile 2
profile2 = new Layer
	width: 400
	height: 400	
	backgroundColor: null
	parent: profileArea
	style: mixBlendMode: "multiply"
	
svg2 = new Layer  
	width: Screen.width
	height: Screen.height
	x: -profileWrapper.x
	y: -profileWrapper.y		
	borderRadius: 200
	backgroundColor: null
	html: '<svg id="svg2" style="position: absolute; box-shadow: inset 0 0 0 1px white;" width="100%" height="100%" viewbox="0 0 #{Screen.width} #{Screen.height}"></svg>'
	style: 
		fill:   'none'
		stroke: '#fff'
		strokeWidth: '50'
		strokeLinecap: 'round'
	custom:
		polyline: null
		svg: null
		active: false
	parent: profile2

# Drawing part
newPolyline = ->
	# Get the svg element if we don't have it
	svg.custom.svg = document.getElementById "svg" if svg.custom.svg is null
	# Create a new polyline node and append it to the svg tag
	svg.custom.polyline = document.createElementNS "http://www.w3.org/2000/svg", "polyline"
	svg.custom.svg.appendChild svg.custom.polyline

	#for svg 2
	svg2.custom.svg = document.getElementById "svg2" if svg2.custom.svg is null
	# Create a new polyline node and append it to the svg tag
	svg2.custom.polyline = document.createElementNS "http://www.w3.org/2000/svg", "polyline"
	svg2.custom.svg.appendChild svg2.custom.polyline


updatePoints = (event, layer) ->
	# Get Pointer Position
	pos = Pointer.screen event, layer
	# Create a new point
	point = svg.custom.svg.createSVGPoint()
	point.x = pos.x
	point.y = pos.y 
		
	# Creat a second point
	point2 = svg2.custom.svg.createSVGPoint()
	point2.x = pos.x
	point2.y = pos.y
	
	# Add the point to the two polylines
	svg.custom.polyline.points.appendItem point
	svg2.custom.polyline.points.appendItem point2

area.on Events.TouchStart, -> 
	svg.custom.active = true
	newPolyline()
	
area.on Events.TouchEnd, ->
	svg.custom.active = false
	
area.on Events.TouchMove, (event, layer) ->
	return unless svg.custom.active
	updatePoints event, layer