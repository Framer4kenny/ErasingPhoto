# ErasingPhoto

- Erasing Photo 
  - pointer module
  - clip: true
  - svg = new Layer
  - mixBlendMode: "screen"
  - mixBlendMode: "multiply"
  - svg.custom.svg = document.getElementByID "svg"
  - updatePoints = (event,layer) ->
  - svg.custom.active 

```
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
```
