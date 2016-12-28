"use strict";

import ColorMaster from "models/master/ColorMaster"
import Color from "models/Color"
import Tile from "models/Tile"
import wu from "wu"

var cm = ColorMaster;

var colors3 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.lightYellowGreen,
  cm.lightSky,
  cm.beige,
  cm.lightPurple,
  cm.lightGray,
  cm.gray,
  cm.black
];

var colors4 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.beige,
  cm.lightGray,
  cm.gray,
  cm.black
];

var colors5 = [
  cm.red,
  cm.yellow,
  cm.green,
  cm.blue,
  cm.sky,
  cm.pink,
  cm.orange,
  cm.purple,
  cm.brown,
  cm.lightPink,
  cm.cream,
  cm.lightYellowGreen,
  cm.lightSky,
  cm.beige,
  cm.lightGreen,
  cm.lightPurple,
  cm.white,
  cm.lightGray,
  cm.gray,
  cm.black
];

var colorsGray = [
  cm.black,
  cm.white
]

var nums = "0123456789";
var jap = "㌀㌁㌂㌃㌄㌅㌆㌇㌈㌉㌊㌋㌌㌍㌎㌏㌐㌑㌒㌓㌔㌕㌖㌗㌘㌙㌚㌛㌜㌝㌞㌟㌠㌡㌢㌣㌤㌥㌦㌧㌨㌩㌪㌫㌬㌭㌮㌯㌰㌱㌲㌳㌴㌵㌶㌷㌸㌹㌺㌻㌼㌽㌾㌿㍀㍁㍂㍃㍄㍅㍆㍇㍈㍉㍊㍋㍌㍍㍎㍏㍐㍑㍒㍓㍔㍕㍖㍗㍿";
var yi = "ꀀꀁꀂꀃꀄꀅꀆꀇꀈꀉꀊꀋꀌꀍꀎꀏꀐꀑꀒꀓꀔꀕꀖꀗꀘꀙꀚꀛꀜꀝꀞꀟꀠꀡꀢꀣꀤꀥꀦꀧꀨꀩꀪꀫꀬꀭꀮꀯꀰꀱꀲꀳꀴꀵꀶꀷꀸꀹꀺꀻꀼꀽꀾꀿꁀꁁꁂꁃꁄꁅꁆꁇꁈꁉꁊꁋꁌꁍꁎꁏꁐꁑꁒꁓꁔꁕꁖꁗꁘꁙꁚꁛꁜꁝꁞꁟꁠꁡꁢꁣꁤꁥꁦꁧꁨꁩꁪꁫꁬꁭꁮꁯꁰꁱꁲꁳꁴꁵꁶꁷꁸꁹꁺꁻꁼꁽꁾꁿꂀꂁꂂꂃꂄꂅꂆꂇꂈꂉꂊꂋꂌꂍꂎꂏꂐꂑꂒꂓꂔꂕꂖꂗꂘꂙꂚꂛꂜꂝꂞꂟꂠꂡꂢꂣꂤꂥꂦꂧꂨꂩꂪꂫꂬꂭꂮꂯꂰꂱꂲꂳꂴꂵꂶꂷꂸꂹꂺꂻꂼꂽꂾꂿꃀꃁꃂꃃꃄꃅꃆꃇꃈꃉꃊꃋꃌꃍꃎꃏꃐꃑꃒꃓꃔꃕꃖꃗꃘꃙꃚꃛꃜꃝꃞꃟꃠꃡꃢꃣꃤꃥꃦꃧꃨꃩꃪꃫꃬꃭꃮꃯꃰꃱꃲꃳꃴꃵꃶꃷꃸꃹꃺꃻꃼꃽꃾꃿꄀꄁꄂꄃꄄꄅꄆꄇꄈꄉꄊꄋꄌꄍꄎꄏꄐꄑꄒꄓꄔꄕꄖꄗꄘꄙꄚꄛꄜꄝꄞꄟꄠꄡꄢꄣꄤꄥꄦꄧꄨꄩꄪꄫꄬꄭꄮꄯꄰꄱꄲꄳꄴꄵꄶꄷꄸꄹꄺꄻꄼꄽꄾꄿꅀꅁꅂꅃꅄꅅꅆꅇꅈꅉꅊꅋꅌꅍꅎꅏꅐꅑꅒꅓꅔꅕꅖꅗꅘꅙꅚꅛꅜꅝꅞꅟꅠꅡꅢꅣꅤꅥꅦꅧꅨꅩꅪꅫꅬꅭꅮꅯꅰꅱꅲꅳꅴꅵꅶꅷꅸꅹꅺꅻꅼꅽꅾꅿꆀꆁꆂꆃꆄꆅꆆꆇꆈꆉꆊꆋꆌꆍꆎꆏꆐꆑꆒꆓꆔꆕꆖꆗꆘꆙꆚꆛꆜꆝꆞꆟꆠꆡꆢꆣꆤꆥꆦꆧꆨꆩꆪꆫꆬꆭꆮꆯꆰꆱꆲꆳꆴꆵꆶꆷꆸꆹꆺꆻꆼꆽꆾꆿꇀꇁꇂꇃꇄꇅꇆꇇꇈꇉꇊꇋꇌꇍꇎꇏꇐꇑꇒꇓꇔꇕꇖꇗꇘꇙꇚꇛꇜꇝꇞꇟꇠꇡꇢꇣꇤꇥꇦꇧꇨꇩꇪꇫꇬꇭꇮꇯꇰꇱꇲꇳ";

var f = (colors, texts, types) => Array.from(wu(colors).map((color) =>
  wu(texts).map((text) =>
    wu(types).map((type) => {
      var borderColor = color.isWhite() ? new Color(0) : color;
      return new Tile(color, borderColor, text, type)
    })
  )
).flatten())

var levels = {
  3: [
    f(colors3, [""], ["square"]),
    f(colors3, [""], ["square", "circle"]),
    f(colors3, nums, ["square", "circle"]),
    f(colors3, jap,  ["square", "circle"]),
    f(colorsGray, yi,   ["square"]),
  ],
  4: [
    f(colors4, [""], ["square", "circle"]),
    f(colors4, nums, ["square", "circle"]),
    f(colors4, jap,  ["square", "circle"])
  ],
  5: [
    f(colors5, [""], ["square", "circle"]),
    f(colors5, nums, ["square", "circle"]),
    f(colors5, jap,  ["square", "circle"])
  ]
}

export default {
  3: [
    {level: 1, tileUpdationRule: [
      {score:     0, tiles: levels[3][0]},
      {score:  1000, tiles: levels[3][1]},
      {score:  3000, tiles: levels[3][2]},
      {score:  6000, tiles: levels[3][3]},
      {score: 10000, tiles: levels[3][4]},
    ]}
  ],
  4: [
    {level: 1, tileUpdationRule: [
      {score:   0, tiles: levels[4][0]},
      {score: 1000, tiles: levels[4][1]},
      {score: 3000, tiles: levels[4][2]},
    ]}
  ],
  5: [
    {level: 1, tileUpdationRule: [
      {score:   0, tiles: levels[5][0]},
      {score: 1000, tiles: levels[5][1]},
      {score: 3000, tiles: levels[5][2]},
    ]}
  ]
};

