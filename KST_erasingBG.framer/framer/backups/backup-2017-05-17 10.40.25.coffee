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
	parent: profile1
	
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
