//Constants
const ZERO = 0;
const SIZE = 8; //Last index of alicuota table
const MONTHS = 12;
const MONTHS_PLUS = MONTHS + 1; //Months + 1 for AGUINALDO
const TRUE = "1";
const FALSE = "0";
const FIFTY = 0.5;
const APORTE_JUBILATORIO = 0.11;
const APORTE_OBRA_SOCIAL = 0.06;
const PORCENTAJE_MOVILIDAD = 0.4;
const NO_TAX = 2 ** 52;

//Here you can add a year with its values
const CONSTANTS = {
  2020: {
    TOPE_SEGUROS: 18000,
    TOPE_INTERESES: 20000,
    GMNI: 123861.17,
    DEDUCCION_CONYUGE: 115471.38,
    DEDUCCION_POR_HIJO: 58232.65,
    DEDUCCION_ESPECIAL_EMPLEADO: 594533.62,
    GMNI_PATAGONIA: 151110.63,
    DEDUCCION_CONYUGE_PATAGONIA: 140875.09,
    DEDUCCION_POR_HIJO_PATAGONIA: 71043.83,
    DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA: 725331.02,
    TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
    TABLA_ALICUOTA_TOPES: [
      0, 47669.16, 95338.32, 143007.48, 190676.65, 286014.96, 381353.28, 572029.92, 762706.57,
    ],
    TABLA_ALICUOTA_BASES: [
      0, 2383.46, 6673.68, 12393.98, 19544.36, 37658.64, 59586.45, 111069.14, 170178.9,
    ],
  },
  20211: {
    TOPE_SEGUROS: 24000,
    TOPE_INTERESES: 20000,
    GMNI: 167678.4,
    DEDUCCION_CONYUGE: 156320.63,
    DEDUCCION_POR_HIJO: 78833.08,
    DEDUCCION_ESPECIAL_EMPLEADO: 804856.34,
    GMNI_PATAGONIA: 204567.66,
    DEDUCCION_CONYUGE_PATAGONIA: 190711.18,
    DEDUCCION_POR_HIJO_PATAGONIA: 96176.36,
    DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA: 981924.74,
    TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
    TABLA_ALICUOTA_TOPES: [
      0, 64532.64, 129065.29, 193597.93, 258130.58, 387195.86, 516261.14, 774391.71, 1032522.3,
    ],
    TABLA_ALICUOTA_BASES: [
      0, 3226.63, 9034.57, 16778.49, 26458.39, 50980.79, 80665.8, 150361.06, 230381.54,
    ],
    SUELO_IMPUESTO: 150000,
    SUELO_DEDUCCION_ESPECIAL: 173000,
    SUELDO_BRUTO_DEDUCCION_ESPECIAL: [
      150100, 150200, 150300, 150400, 150500, 150600, 150700, 150800, 150900, 151000, 151100,
      151200, 151300, 151400, 151500, 151600, 151700, 151800, 151900, 152000, 152100, 152200,
      152300, 152400, 152500, 152600, 152700, 152800, 152900, 153000, 153100, 153200, 153300,
      153400, 153500, 153600, 153700, 153800, 153900, 154000, 154100, 154200, 154300, 154400,
      154500, 154600, 154700, 154800, 154900, 155000, 155100, 155200, 155300, 155400, 155500,
      155600, 155700, 155800, 155900, 156000, 156100, 156200, 156300, 156400, 156500, 156600,
      156700, 156800, 156900, 157000, 157100, 157200, 157300, 157400, 157500, 157600, 157700,
      157800, 157900, 158000, 158100, 158200, 158300, 158400, 158500, 158600, 158700, 158800,
      158900, 159000, 159100, 159200, 159300, 159400, 159500, 159600, 159700, 159800, 159900,
      160000, 160100, 160200, 160300, 160400, 160500, 160600, 160700, 160800, 160900, 161000,
      161100, 161200, 161300, 161400, 161500, 161600, 161700, 161800, 161900, 162000, 162100,
      162200, 162300, 162400, 162500, 162600, 162700, 162800, 162900, 163000, 163100, 163200,
      163300, 163400, 163500, 163600, 163700, 163800, 163900, 164000, 164100, 164200, 164300,
      164400, 164500, 164600, 164700, 164800, 164900, 165000, 165100, 165200, 165300, 165400,
      165500, 165600, 165700, 165800, 165900, 166000, 166100, 166200, 166300, 166400, 166500,
      166600, 166700, 166800, 166900, 167000, 167100, 167200, 167300, 167400, 167500, 167600,
      167700, 167800, 167900, 168000, 168100, 168200, 168300, 168400, 168500, 168600, 168700,
      168800, 168900, 169000, 169100, 169200, 169300, 169400, 169500, 169600, 169700, 169800,
      169900, 170000, 170100, 170200, 170300, 170400, 170500, 170600, 170700, 170800, 170900,
      171000, 171100, 171200, 171300, 171400, 171500, 171600, 171700, 171800, 171900, 172000,
      172100, 172200, 172300, 172400, 172500, 172600, 172700, 172800, 172900, 173000,
    ],
    DEDUCCION_ESPECIAL: [
      42979, 42609, 42270, 41950, 41644, 41348, 41061, 40780, 40505, 40236, 39971, 39710, 39452,
      39199, 38948, 38700, 38454, 38211, 37970, 37732, 37495, 37261, 37028, 36797, 36567, 36339,
      36113, 35888, 35664, 35442, 35221, 35001, 34782, 34565, 34348, 34133, 33918, 33705, 33492,
      33281, 33070, 32860, 32651, 32443, 32236, 32029, 31824, 31618, 31414, 31211, 31008, 30805,
      30604, 30403, 30203, 30003, 29804, 29605, 29407, 29210, 29013, 28817, 28621, 28426, 28231,
      28037, 27844, 27651, 27458, 27266, 27074, 26883, 26692, 26501, 26311, 26122, 25933, 25744,
      25556, 25368, 25181, 24994, 24807, 24621, 24435, 24249, 24064, 23879, 23695, 23511, 23327,
      23143, 22960, 22778, 22595, 22413, 22231, 22050, 21869, 21688, 21507, 21327, 21147, 20968,
      20788, 20609, 20430, 20252, 20074, 19896, 19718, 19541, 19364, 19187, 19010, 18834, 18658,
      18482, 18307, 18132, 17957, 17782, 17607, 17433, 17259, 17085, 16911, 16738, 16565, 16392,
      16219, 16047, 15875, 15703, 15531, 15359, 15188, 15017, 14846, 14675, 14505, 14334, 14164,
      13994, 13824, 13655, 13486, 13317, 13148, 12979, 12810, 12642, 12474, 12306, 12138, 11970,
      11803, 11636, 11469, 11302, 11135, 10969, 10802, 10636, 10470, 10304, 10139, 9973, 9808, 9643,
      9478, 9313, 9148, 8983, 8819, 8655, 8491, 8327, 8163, 8000, 7836, 7673, 7510, 7347, 7184,
      7022, 6859, 6697, 6534, 6372, 6210, 6049, 5887, 5726, 5564, 5403, 5242, 5081, 4920, 4760,
      4599, 4439, 4278, 4118, 3958, 3798, 3639, 3479, 3320, 3160, 3001, 2842, 2683, 2524, 2366,
      2207, 2049, 1890, 1732, 1574, 1416, 1258, 1101, 943, 786, 628, 471, 314, 157, 0,
    ],
  },
  20212: {
    TOPE_SEGUROS: 24000,
    TOPE_INTERESES: 20000,
    GMNI: 167678.4,
    DEDUCCION_CONYUGE: 156320.63,
    DEDUCCION_POR_HIJO: 78833.08,
    DEDUCCION_ESPECIAL_EMPLEADO: 804856.34,
    GMNI_PATAGONIA: 204567.66,
    DEDUCCION_CONYUGE_PATAGONIA: 190711.18,
    DEDUCCION_POR_HIJO_PATAGONIA: 96176.36,
    DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA: 981924.74,
    TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
    TABLA_ALICUOTA_TOPES: [
      0, 64532.64, 129065.29, 193597.93, 258130.58, 387195.86, 516261.14, 774391.71, 1032522.3,
    ],
    TABLA_ALICUOTA_BASES: [
      0, 3226.63, 9034.57, 16778.49, 26458.39, 50980.79, 80665.8, 150361.06, 230381.54,
    ],
    SUELO_IMPUESTO: 175000,
    SUELO_DEDUCCION_ESPECIAL: 203000,
    SUELDO_BRUTO_DEDUCCION_ESPECIAL: [
      175100, 175200, 175300, 175400, 175500, 175600, 175700, 175800, 175900, 176000, 176100,
      176200, 176300, 176400, 176500, 176600, 176700, 176800, 176900, 177000, 177100, 177200,
      177300, 177400, 177500, 177600, 177700, 177800, 177900, 178000, 178100, 178200, 178300,
      178400, 178500, 178600, 178700, 178800, 178900, 179000, 179100, 179200, 179300, 179400,
      179500, 179600, 179700, 179800, 179900, 180000, 180100, 180200, 180300, 180400, 180500,
      180600, 180700, 180800, 180900, 181000, 181100, 181200, 181300, 181400, 181500, 181600,
      181700, 181800, 181900, 182000, 182100, 182200, 182300, 182400, 182500, 182600, 182700,
      182800, 182900, 183000, 183100, 183200, 183300, 183400, 183500, 183600, 183700, 183800,
      183900, 184000, 184100, 184200, 184300, 184400, 184500, 184600, 184700, 184800, 184900,
      185000, 185100, 185200, 185300, 185400, 185500, 185600, 185700, 185800, 185900, 186000,
      186100, 186200, 186300, 186400, 186500, 186600, 186700, 186800, 186900, 187000, 187100,
      187200, 187300, 187400, 187500, 187600, 187700, 187800, 187900, 188000, 188100, 188200,
      188300, 188400, 188500, 188600, 188700, 188800, 188900, 189000, 189100, 189200, 189300,
      189400, 189500, 189600, 189700, 189800, 189900, 190000, 190100, 190200, 190300, 190400,
      190500, 190600, 190700, 190800, 190900, 191000, 191100, 191200, 191300, 191400, 191500,
      191600, 191700, 191800, 191900, 192000, 192100, 192200, 192300, 192400, 192500, 192600,
      192700, 192800, 192900, 193000, 193100, 193200, 193300, 193400, 193500, 193600, 193700,
      193800, 193900, 194000, 194100, 194200, 194300, 194400, 194500, 194600, 194700, 194800,
      194900, 195000, 195100, 195200, 195300, 195400, 195500, 195600, 195700, 195800, 195900,
      196000, 196100, 196200, 196300, 196400, 196500, 196600, 196700, 196800, 196900, 197000,
      197100, 197200, 197300, 197400, 197500, 197600, 197700, 197800, 197900, 198000, 198100,
      198200, 198300, 198400, 198500, 198600, 198700, 198800, 198900, 199000, 199100, 199200,
      199300, 199400, 199500, 199600, 199700, 199800, 199900, 200000, 200100, 200200, 200300,
      200400, 200500, 200600, 200700, 200800, 200900, 201000, 201100, 201200, 201300, 201400,
      201500, 201600, 201700, 201800, 201900, 202000, 202100, 202200, 202300, 202400, 202500,
      202600, 202700, 202800, 202900, 203000,
    ],
    DEDUCCION_ESPECIAL: [
      63608, 63143, 62718, 62317, 61933, 61561, 61200, 60848, 60503, 60165, 59832, 59505, 59182,
      58863, 58548, 58237, 57929, 57624, 57322, 57023, 56726, 56431, 56139, 55849, 55561, 55275,
      54991, 54709, 54428, 54149, 53872, 53596, 53321, 53048, 52776, 52506, 52237, 51969, 51702,
      51437, 51173, 50909, 50647, 50386, 50126, 49866, 49608, 49351, 49094, 48839, 48584, 48330,
      48077, 47825, 47574, 47323, 47073, 46824, 46576, 46328, 46081, 45835, 45590, 45345, 45100,
      44857, 44614, 44371, 44130, 43888, 43648, 43408, 43168, 42929, 42691, 42453, 42216, 41979,
      41743, 41507, 41272, 41037, 40803, 40569, 40336, 40103, 39870, 39638, 39407, 39176, 38945,
      38715, 38485, 38256, 38027, 37799, 37571, 37343, 37116, 36889, 36662, 36436, 36210, 35985,
      35760, 35535, 35311, 35087, 34863, 34640, 34417, 34194, 33972, 33750, 33529, 33307, 33086,
      32866, 32646, 32426, 32206, 31987, 31768, 31549, 31330, 31112, 30894, 30677, 30460, 30243,
      30026, 29810, 29593, 29378, 29162, 28947, 28732, 28517, 28302, 28088, 27874, 27660, 27447,
      27234, 27021, 26808, 26595, 26383, 26171, 25959, 25748, 25537, 25326, 25115, 24904, 24694,
      24484, 24274, 24064, 23855, 23646, 23437, 23228, 23019, 22811, 22603, 22395, 22187, 21980,
      21772, 21565, 21359, 21152, 20945, 20739, 20533, 20327, 20122, 19916, 19711, 19506, 19301,
      19096, 18892, 18687, 18483, 18279, 18076, 17872, 17669, 17465, 17262, 17060, 16857, 16654,
      16452, 16250, 16048, 15846, 15645, 15443, 15242, 15041, 14840, 14639, 14439, 14238, 14038,
      13838, 13638, 13438, 13238, 13039, 12840, 12640, 12442, 12243, 12044, 11845, 11647, 11449,
      11251, 11053, 10855, 10658, 10460, 10263, 10066, 9869, 9672, 9475, 9278, 9082, 8886, 8690,
      8494, 8298, 8102, 7906, 7711, 7516, 7320, 7125, 6931, 6736, 6541, 6347, 6152, 5958, 5764,
      5570, 5376, 5183, 4989, 4796, 4602, 4409, 4216, 4023, 3830, 3638, 3445, 3253, 3060, 2868,
      2676, 2484, 2292, 2101, 1909, 1718, 1526, 1335, 1144, 953, 762, 571, 381, 190, 0,
    ],
  },
  2022: {
    TOPE_SEGUROS: 24000,
    TOPE_INTERESES: 20000,
    GMNI: 252564.84,
    DEDUCCION_CONYUGE: 235457.25,
    DEDUCCION_POR_HIJO: 118741.97,
    //  DEDUCCION_POR_HIJO incapacitado: 237483.94,
    DEDUCCION_ESPECIAL_EMPLEADO: 1212311.24,
    GMNI_PATAGONIA: 308129.12,
    DEDUCCION_CONYUGE_PATAGONIA: 287257.86,
    DEDUCCION_POR_HIJO_PATAGONIA: 144865.21,
    // DEDUCCION_POR_HIJO_INCAPACITADO_PATAGONIA: 289730.42,
    DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA: 1479019.72,
    TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
    TABLA_ALICUOTA_TOPES: [
      0, 97202, 194404.01, 291606.01, 388808.02, 583212.02, 777616.02, 1166424.03, 1555232.07,
    ],
    TABLA_ALICUOTA_BASES: [
      0, 4860.1, 13608.28, 25272.52, 39852.82, 76789.58, 121502.5, 226480.66, 347011.16,
    ],
    SUELO_IMPUESTO: 225937,
    SUELO_DEDUCCION_ESPECIAL: 260580,
    SUELDO_BRUTO_DEDUCCION_ESPECIAL: [
      226087, 226238, 226389, 226539, 226690, 226841, 226991, 227142, 227292, 227443, 227594,
      227744, 227895, 228046, 228196, 228347, 228497, 228648, 228799, 228949, 229100, 229251,
      229401, 229552, 229702, 229853, 230004, 230154, 230305, 230456, 230606, 230757, 230907,
      231058, 231209, 231359, 231510, 231661, 231811, 231962, 232112, 232263, 232414, 232564,
      232715, 232866, 233016, 233167, 233317, 233468, 233619, 233769, 233920, 234071, 234221,
      234372, 234522, 234673, 234824, 234974, 235125, 235276, 235426, 235577, 235727, 235878,
      236029, 236179, 236330, 236481, 236631, 236782, 236932, 237083, 237234, 237384, 237535,
      237686, 237836, 237987, 238137, 238288, 238439, 238589, 238740, 238891, 239041, 239192,
      239342, 239493, 239644, 239794, 239945, 240096, 240246, 240397, 240547, 240698, 240849,
      240999, 241150, 241301, 241451, 241602, 241752, 241903, 242054, 242204, 242355, 242506,
      242656, 242807, 242957, 243108, 243259, 243409, 243560, 243711, 243861, 244012, 244162,
      244313, 244464, 244614, 244765, 244916, 245066, 245217, 245367, 245518, 245669, 245819,
      245970, 246121, 246271, 246422, 246572, 246723, 246874, 247024, 247175, 247326, 247476,
      247627, 247777, 247928, 248079, 248229, 248380, 248531, 248681, 248832, 248982, 249133,
      249284, 249434, 249585, 249736, 249886, 250037, 250187, 250338, 250489, 250639, 250790,
      250941, 251091, 251242, 251392, 251543, 251694, 251844, 251995, 252145, 252296, 252447,
      252597, 252748, 252899, 253049, 253200, 253350, 253501, 253652, 253802, 253953, 254104,
      254254, 254405, 254555, 254706, 254857, 255007, 255158, 255309, 255459, 255610, 255760,
      255911, 256062, 256212, 256363, 256514, 256664, 256815, 256965, 257116, 257267, 257417,
      257568, 257719, 257869, 258020, 258170, 258321, 258472, 258622, 258773, 258924, 259074,
      259225, 259375, 259526, 259677, 259827, 259978, 260129, 260279, 260430, 260580,
    ],
    DEDUCCION_ESPECIAL: [
      64737, 64180, 63669, 63187, 62726, 62280, 61848, 61425, 61010, 60605, 60206, 59813, 59424,
      59043, 58665, 58292, 57921, 57555, 57192, 56834, 56477, 56124, 55773, 55425, 55079, 54735,
      54395, 54056, 53719, 53384, 53051, 52720, 52390, 52063, 51737, 51413, 51089, 50768, 50447,
      50129, 49812, 49495, 49180, 48867, 48555, 48244, 47935, 47624, 47317, 47011, 46706, 46400,
      46097, 45794, 45493, 45192, 44892, 44592, 44294, 43997, 43701, 43405, 43110, 42817, 42523,
      42231, 41940, 41649, 41358, 41069, 40780, 40492, 40205, 39917, 39631, 39346, 39061, 38777,
      38494, 38210, 37929, 37647, 37365, 37085, 36805, 36525, 36246, 35968, 35690, 35413, 35136,
      34859, 34583, 34309, 34034, 33759, 33485, 33213, 32940, 32667, 32395, 32124, 31853, 31583,
      31312, 31042, 30773, 30504, 30236, 29968, 29700, 29434, 29167, 28900, 28634, 28369, 28104,
      27838, 27575, 27311, 27048, 26784, 26520, 26258, 25996, 25734, 25472, 25212, 24951, 24690,
      24430, 24171, 23912, 23653, 23393, 23134, 22877, 22619, 22362, 22104, 21848, 21591, 21334,
      21078, 20822, 20568, 20313, 20059, 19804, 19550, 19295, 19042, 18789, 18536, 18283, 18030,
      17778, 17527, 17275, 17024, 16772, 16522, 16270, 16020, 15770, 15520, 15272, 15022, 14773,
      14525, 14276, 14028, 13779, 13531, 13284, 13037, 12790, 12543, 12295, 12050, 11803, 11557,
      11312, 11066, 10821, 10577, 10331, 10087, 9842, 9598, 9354, 9111, 8867, 8625, 8381, 8138,
      7896, 7653, 7411, 7170, 6927, 6686, 6444, 6203, 5962, 5721, 5481, 5240, 5001, 4760, 4520,
      4281, 4041, 3802, 3564, 3324, 3086, 2847, 2609, 2371, 2133, 1895, 1658, 1420, 1184, 946, 709,
      473, 236, 0,
    ],
  },
};

//Functions
$(document).ready(function () {
  var retirement_contribution = APORTE_JUBILATORIO;
  var healt_insurance_contribution = APORTE_OBRA_SOCIAL;
  // Hardcoded to show a number in the spouse div, it changes when the year or the region are selected
  var gmni = CONSTANTS[20211].GMNI;
  var child_deduction_factor = ZERO;
  var special_deduction = ZERO;
  var spouse_deduction = ZERO;
  var child_deduction = ZERO;
  var children_amount = ZERO;
  var disabled_children_amount = ZERO;
  var monthly_salary = ZERO;
  var year_val = ZERO;
  var other_father_deducts = FALSE;
  var can_deduct_spouse = FALSE;
  var is_patagonia = FALSE;
  var receives_auh = FALSE;

  var div_gmni = document.getElementById("myGMNI");
  div_gmni.textContent = "$".concat(" ", gmni, " al año");

  //Year parsing
  //Here and in the parse of the region the gmni is calculated
  //to show it in the middle of the programm
  $("#select_year").on("change", function () {
    year_val = parseInt(document.getElementById("select_year").value);
    if (is_patagonia === TRUE) {
      gmni = CONSTANTS[year_val].GMNI_PATAGONIA;
      special_deduction = CONSTANTS[year_val].DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA;
      div_gmni.textContent = "$".concat(" ", gmni, " al año");
    } else if (is_patagonia === FALSE) {
      gmni = CONSTANTS[year_val].GMNI;
      special_deduction = CONSTANTS[year_val].DEDUCCION_ESPECIAL_EMPLEADO;
      div_gmni.textContent = "$".concat(" ", gmni, " al año");
    }
    monthly_salary = parseInt(document.getElementById("sueldo_bruto").value);
    if (monthly_salary === ZERO) {
      $("#no_tax_message").hide();
    } else if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
      $("#no_tax_message").show();
    } else {
      $("#no_tax_message").hide();
    }
  });

  //region function
  $("#select_region").on("change", function () {
    is_patagonia = document.getElementById("select_region").value;
    if (is_patagonia === TRUE) {
      gmni = CONSTANTS[year_val].GMNI_PATAGONIA;
      special_deduction = CONSTANTS[year_val].DEDUCCION_ESPECIAL_EMPLEADO_PATAGONIA;
      div_gmni.textContent = "$".concat(" ", gmni, " al año");
    } else if (is_patagonia === FALSE) {
      gmni = CONSTANTS[year_val].GMNI;
      special_deduction = CONSTANTS[year_val].DEDUCCION_ESPECIAL_EMPLEADO;
      div_gmni.textContent = "$".concat(" ", gmni, " al año");
    }
  });

  //salary
  //capaz que corriendo los ifs de aca en lo de select year TAMBIEN
  $("#sueldo_bruto")
    .on("input", function () {
      monthly_salary = parseInt(document.getElementById("sueldo_bruto").value);
      if (monthly_salary === ZERO) {
        $("#no_tax_message").hide();
      } else if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
        $("#no_tax_message").show();
      } else {
        $("#no_tax_message").hide();
      }
    })
    .trigger("input");

  //spouse
  $("#conyuge").on("change", function () {
    can_deduct_spouse = document.getElementById("conyuge").value;
  });

  //children
  $("#hijos")
    .on("input", function () {
      children_amount = parseInt(document.getElementById("hijos").value);
      if (children_amount === ZERO && disabled_children_amount === ZERO) {
        //This selects are inneccesary without children
        $("#hijos_label_1").hide();
        $("#hijos_label_2").hide();
        $("#asignaciones").hide();
        $("#asignaciones").val("");
        $("#otro_padre_deduce").hide();
        $("#otro_padre_deduce").val("");
      } else {
        //if there are children, show the "asignaciones" select
        $("#hijos_label_1").show();
        $("#asignaciones").show();
      }
    })
    .trigger("input");

  //disabled children
  $("#hijos_incapacitados")
    .on("input", function () {
      disabled_children_amount = parseInt(document.getElementById("hijos_incapacitados").value);
      if (disabled_children_amount === ZERO && children_amount === ZERO) {
        //This selects are inneccesary without children
        $("#hijos_label_1").hide();
        $("#hijos_label_2").hide();
        $("#asignaciones").hide();
        $("#asignaciones").val("");
        $("#otro_padre_deduce").hide();
        $("#otro_padre_deduce").val("");
      } else {
        //if there are children, show the "asignaciones" select
        $("#hijos_label_1").show();
        $("#asignaciones").show();
      }
    })
    .trigger("input");

  //Checking if receives auh
  $("#asignaciones").on("change", function () {
    receives_auh = document.getElementById("asignaciones").value;
    if (receives_auh === FALSE) {
      //if is false, show the "otro padre deduce" select
      $("#otro_padre_deduce").show();
      $("#hijos_label_2").show();
    } else {
      //if is true, hide it
      $("#otro_padre_deduce").hide();
      $("#otro_padre_deduce").val("");
      $("#hijos_label_2").hide();
    }
  });

  //checking if the other father deducts his children
  $("#otro_padre_deduce").on("change", function () {
    other_father_deducts = document.getElementById("otro_padre_deduce").value;
  });

  //-------------------Button-------------------
  $("#button_calculate").on("click", function () {
    var special_deduction_table = ZERO;
    var yearly_payement = ZERO;
    var i = ZERO;
    //checking that all the selects are selected when neccesary
    if (
      document.getElementById("select_year").value === "" ||
      document.getElementById("select_region").value === "" ||
      document.getElementById("conyuge").value === "" ||
      (document.getElementById("asignaciones").value === "" && children_amount != ZERO) ||
      (document.getElementById("otro_padre_deduce").value === "" &&
        children_amount != ZERO &&
        receives_auh === FALSE)
    ) {
      var result_div = document.getElementById("text_total");
      mytext = "No se completaron todas las opciones";
      result_div.textContent = mytext;
      $("#text_total").show();
      return 0;
    }

    // If monthly salary is lesser than the tax floor for that year, there is no tax.
    // If is lesser than the floor for the special deduction, and bigger than the tax floor,
    // we use the table to calculate a new deduction
    if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
      special_deduction_table = NO_TAX;
    } else if (monthly_salary <= CONSTANTS[year_val].SUELO_DEDUCCION_ESPECIAL) {
      for (let idx = 0; idx < CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL.length; idx++) {
        if (CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL[idx] >= monthly_salary) {
          special_deduction_table = CONSTANTS[year_val].DEDUCCION_ESPECIAL[idx];
          break;
        }
      }
    }

    // With the gross salary, we calculate the yearly net income,
    // it is multiplied by months plus because we are adding the aguinaldo
    var gross_salry = $("#sueldo_bruto").val() * MONTHS_PLUS;
    var net_income =
      gross_salry -
      gross_salry * retirement_contribution -
      gross_salry * healt_insurance_contribution;

    //The spouse deduction value depends on if it is from Patagonia
    if (can_deduct_spouse === TRUE) {
      if (is_patagonia === TRUE) {
        spouse_deduction = CONSTANTS[year_val].DEDUCCION_CONYUGE_PATAGONIA;
      } else if (is_patagonia === FALSE) {
        spouse_deduction = CONSTANTS[year_val].DEDUCCION_CONYUGE;
      }
    } else if (can_deduct_spouse === FALSE) {
      spouse_deduction = ZERO;
    }

    //Calculate the deduction per child, disabled children count for two
    child_deduction_factor = children_amount + disabled_children_amount * 2;
    // If receives auh, it can't deduct the children
    if (receives_auh === TRUE) {
      child_deduction_factor = child_deduction_factor * ZERO;
    }
    //If the other father deducts, only deducts the %50
    if (other_father_deducts === TRUE) {
      child_deduction_factor = child_deduction_factor * FIFTY;
    }
    //Different value depending if it is from Patagonia
    if (is_patagonia === TRUE) {
      child_deduction = child_deduction_factor * CONSTANTS[year_val].DEDUCCION_POR_HIJO_PATAGONIA;
    } else if (is_patagonia === FALSE) {
      child_deduction = child_deduction_factor * CONSTANTS[year_val].DEDUCCION_POR_HIJO;
    }

    // domestic employee and rent deduction have a max yearly deduction of gmni per year
    var domestic_employee_deduction = $("#servicio_domestico").val() * MONTHS;
    if (domestic_employee_deduction >= gmni) {
      domestic_employee_deduction = gmni;
    }
    var rent_deduction = $("#alquiler").val() * MONTHS;
    if (rent_deduction >= gmni) {
      rent_deduction = gmni;
    }

    //life insurance and retirement insurance have a max yearly deduction on his own
    var life_insurance_deduction = $("#seguro_vida").val() * MONTHS;
    if (life_insurance_deduction >= CONSTANTS[year_val].TOPE_SEGUROS) {
      life_insurance_deduction = CONSTANTS[year_val].TOPE_SEGUROS;
    }
    var retirement_insurance_deduction = $("#seguro_retiro").val() * MONTHS;
    if (retirement_insurance_deduction >= CONSTANTS[year_val].TOPE_SEGUROS) {
      retirement_insurance_deduction = CONSTANTS[year_val].TOPE_SEGUROS;
    }

    //This one also has his own max deduction
    var mortgage_credit_interest_deduction = $("#intereses_creditos").val() * MONTHS;
    if (mortgage_credit_interest_deduction >= CONSTANTS[year_val].TOPE_INTERESES) {
      mortgage_credit_interest_deduction = CONSTANTS[year_val].TOPE_INTERESES;
    }

    //Transportation has a max deduction of 40% of gmni
    var transportation_deduction = $("#movilidad").val() * MONTHS;
    if (transportation_deduction >= gmni * PORCENTAJE_MOVILIDAD) {
      transportation_deduction = gmni * PORCENTAJE_MOVILIDAD;
    }

    //These have no max deduction per year
    var prepaid_health_deduction = $("#prepaga").val() * MONTHS;
    var other_deduction = $("#otro").val() * MONTHS;

    var deductions =
      spouse_deduction +
      child_deduction +
      domestic_employee_deduction +
      retirement_insurance_deduction +
      life_insurance_deduction +
      mortgage_credit_interest_deduction +
      rent_deduction +
      prepaid_health_deduction +
      transportation_deduction +
      other_deduction;

    //The tax base is the number that is going to be in the alicuota table
    var tax_base =
      net_income - gmni - special_deduction - special_deduction_table * 12 - deductions;

    //This is all the checking to see where is the tax base in the alicuota table.
    //Doing that I get the yealry tax payment, later I divide it by 12 to get the monthly value.
    if (tax_base < ZERO) {
      yearly_payement = ZERO;
    } else if (tax_base < CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) {
      while (yearly_payement === ZERO) {
        if (
          tax_base >= CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i] &&
          tax_base < CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i + 1]
        ) {
          yearly_payement =
            CONSTANTS[year_val].TABLA_ALICUOTA_BASES[i] +
            (tax_base - CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i]) *
              CONSTANTS[year_val].TABLA_ALICUOTA_PORCENTAJES[i];
        }
        i++;
      }
    } else if (tax_base >= CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) {
      yearly_payement =
        CONSTANTS[year_val].TABLA_ALICUOTA_BASES[SIZE] +
        (tax_base - CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) *
          CONSTANTS[year_val].TABLA_ALICUOTA_PORCENTAJES[SIZE];
    }

    var monthly_payement = yearly_payement / MONTHS;
    monthly_payement = monthly_payement.toFixed(2);

    var result_div = document.getElementById("text_total");
    mytext = "Monto a pagar:".concat(" $ ", monthly_payement, " promedio mensual");
    result_div.textContent = mytext;
    $("#text_total").show();
  });
});
