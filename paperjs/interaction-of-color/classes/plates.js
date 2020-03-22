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
}
