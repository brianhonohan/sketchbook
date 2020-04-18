class Plates {

  static get iv_1(){
    return {
      "parts": [
          {"shape": "rect", "color": "0,134,195", "pos": "0,0", "size": "450,175"}
        , {"shape": "rect", "color": "186,126,74", "pos": "187,115", "size": "76,60"}

        , {"shape": "rect", "color": "0,22,110", "pos": "0,175", "size": "450,120"}
        , {"shape": "rect", "color": "212,199,63", "pos": "0,295", "size": "450,120"}

        , {"shape": "rect", "color": "193,121,40", "pos": "0,415", "size": "450,175"}
        , {"shape": "rect", "color": "186,126,74", "pos": "187,415", "size": "76,60"}
      ]
    };
  }

  static get iv_3(){
    return {
      "parts": [
          {"shape": "rect", "color": "115,140,178", "pos": "0,0", "size": "230,150"}
        , {"shape": "cutout", "color": "147,172, 105"
            , "base": {"shape": "rect", "pos": "45,30", "size": "140,90"}
            , "holes": [{
                "shape": "grid", "pos": "57.73,42.86",
                "item": "rect",
                "item_size": "12.73,12.86",
                "rows": 3,
                "cols": 5,
                "row_spacing": 12.73,
                "col_spacing": 12.86
            }]
          }
        , {"shape": "rect", "color": "242,219,0", "pos": "0,150", "size": "230,150"}
        , {"shape": "cutout", "color": "147,172, 105"
            , "base": {"shape": "rect", "pos": "45,180", "size": "140,90"}
            , "holes": [{
                "shape": "grid", "pos": "57.73,192.86",
                "item": "rect",
                "item_size": "12.73,12.86",
                "rows": 3,
                "cols": 5,
                "row_spacing": 12.73,
                "col_spacing": 12.86
            }]
          }

        ]
      };
  }

  static get iv_4(){
    return {
      "parts": [
        // Top and bottom purple rectangles
          {"shape": "rect", "color": "39,24,91", "pos": "0,0", "size": "230,70"}
        , {"shape": "rect", "color": "136,59,144", "pos": "0,253", "size": "230,70"}

        // tilted, lighter purple rectangle
        , {"shape": "rect", "color": "158,81,156", "pos": "35,35", "size": "155,250", "rotation": "5"}

        // overlaid dark blue-grey, and red rectangles
        , {"shape": "rect", "color": "15,43,54", "pos": "0,69", "size": "230,26"}
        , {"shape": "rect", "color": "211,56,26", "pos": "0,94", "size": "230,160"}

      ]
    };
  }



  static get v_3(){
    return {
      "parts": [
        // Blue rectangles
          {"shape": "rect", "color": "45,45,65", "pos": "50,50", "size": "30,125", "rotation": "-2"}
        , {"shape": "rect", "color": "100,118,146", "pos": "35,35", "size": "30,125", "rotation": "-2"}
        , {"shape": "rect", "color": "63,55,114", "pos": "78,0", "size": "30,125", "rotation": "1"}
        , {"shape": "rect", "color": "72,111,169", "pos": "115,30", "size": "30,125", "rotation": "17"}
        , {"shape": "rect", "color": "46,42,79", "pos": "215,23", "size": "30,125", "rotation": "5"}
        , {"shape": "rect", "color": "83,112,127", "pos": "188,27", "size": "30,125", "rotation": "-2"}
        , {"shape": "rect", "color": "104,144,177", "pos": "166,35", "size": "30,125", "rotation": "2"}
        , {"shape": "rect", "color": "86,107,159", "pos": "143,15", "size": "30,125", "rotation": "6"}

        // Red rectangles
          , {"shape": "rect", "color": "104,11,2",  "pos": "45,210", "size": "30,125",  "rotation": "3"}
                , {"shape": "rect", "color": "162,50,30",  "pos": "153,220", "size": "30,125", "rotation": "-2"}
              , {"shape": "rect", "color": "113,12,0",  "pos": "137,190", "size": "30,125",  "rotation": "-2"}
            , {"shape": "rect", "color": "152,75,67", "pos": "109,225", "size": "30,125",  "rotation": "9"}
          , {"shape": "rect", "color": "110,38,36", "pos": "86,230", "size": "30,125",  "rotation": "0"}
        , {"shape": "rect", "color": "150,50,10",  "pos": "66,220", "size": "30,125",  "rotation": "1"}

        , {"shape": "rect", "color": "159,80,50", "pos": "218,203", "size": "30,125", "rotation": "-2"}
        , {"shape": "rect", "color": "135,45,0",  "pos": "193,210", "size": "30,125", "rotation": "4"}
      ]
    };
  }
}
