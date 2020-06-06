# fieldeq
A collection of equations, to create various Vector fields

The intent of this sketch is to experiment with alternate 

Currently the fields have to be toggled on/off via code.

Fields are:

0. LotkaVolterraEquation
0. SimpleWind
0. SinuousWind
0. OddEvenWind
0. StackedWind
0. MultiStackedFields
    -  LotkaVolterraEquation
    -  SimpleWind
    -  SinuousWind
0. GravityField
0. LorentzEquation

## Controls


`a` -  While holding the mouse, will add a ball, you can pull it back like a slingshot and release.

`d` - Will drop a ball every 50 pixels

`C` - Will empty the array of balls

`c` - Will redraw the current screen, clearing existing trails.

`1-7` - Will load a change the field equation to a different preset (see number -> field equation list above)

`f` - Toggles fading the background to black.

`v` - Toggles the display of the vectors describing the field equation.

`b` - Draw the vectors once (useful when background is faded to black)