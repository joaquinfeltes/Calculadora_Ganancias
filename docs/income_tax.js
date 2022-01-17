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
  2021: {
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
  },
  2022: {
    TOPE_SEGUROS: 24000,
    TOPE_INTERESES: 20000,
    GMNI: 252564.84,
    DEDUCCION_CONYUGE: 235457.25,
    DEDUCCION_POR_HIJO: 118741.97,
    //  DEDUCCION_POR_HIJO incapacitado: 237483.94,
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
  },
};

//Functions
$(document).ready(function () {
  var retirement_contribution = APORTE_JUBILATORIO;
  var healt_insurance_contribution = APORTE_OBRA_SOCIAL;
  // Hardcoded to show a number in the spouse div, it changes when the year or the region are selected
  var gmni = CONSTANTS[2021].GMNI;
  var child_deduction_factor = ZERO;
  var special_deduction = ZERO;
  var spouse_deduction = ZERO;
  var child_deduction = ZERO;
  var children_amount = ZERO;
  var disabled_children_amount = ZERO;
  var monthly_salary = ZERO;
  var year_val = ZERO;
  var special_deduction_table = ZERO;
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

  //AGREGAR special_deduction_table o sea leer el valor y sumarlo a las deducciones
  $("#sueldo_bruto")
    .on("input", function () {
      monthly_salary = parseInt(document.getElementById("sueldo_bruto").value);
      if (monthly_salary === ZERO) {
        $("#no_tax_message").hide();
        // $("#special_deduction_message").hide();
      } else if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
        $("#no_tax_message").show();
        // $("#special_deduction_message").hide();
        // $("#special_deduction_table").hide();
        // $("#special_deduction_table").val(0);

        // ESTE ES AL PEDO
      } else if (monthly_salary <= CONSTANTS[year_val].SUELO_DEDUCCION_ESPECIAL) {
        // $("#special_deduction_message").show();
        // $("#special_deduction_table").show();
        $("#no_tax_message").hide();
      } else {
        $("#no_tax_message").hide();
        // $("#special_deduction_message").hide();
        // $("#special_deduction_table").hide();
        // $("#special_deduction_table").val(0);
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

    //QUIERO IMPRIMIR EL SPECIAL_DEDUCTION TABLE PARA VER QUE ESTE BIEN

    //Si el salario mensual es menor al suelo, no se cobra impuesto,
    // hay que ver si no hago esto en otro lado ya
    // si es menor al sueldo deduccion especial y mayor al suelo del impuesto,
    // se usa la tabla
    if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
      //no corresponde impuesto
    } else if (monthly_salary <= CONSTANTS[year_val].SUELO_DEDUCCION_ESPECIAL) {
      // hacer el for de para ver la deduccion especial
      // i = 0;
      // while (CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL[i] < monthly_salary) {
      //   i++;
      // }
      // special_deduction_table = CONSTANTS[year_val].DEDUCCION_ESPECIAL[i];
      special_deduction_table = CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL.length;
      for (let i = 0; i < CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL.length; i++) {
        if (CONSTANTS[year_val].SUELDO_BRUTO_DEDUCCION_ESPECIAL[i] >= monthly_salary) {
          special_deduction_table = CONSTANTS[year_val].DEDUCCION_ESPECIAL[i];
          break;
        }
      }
    }

    // With the gross salary, we calculate the yearly net income,
    // it is multiplied by months plus because we are adding the aguinaldo
    var gross_salry = monthly_salary * MONTHS_PLUS;
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

    //Calculate the deduction per child
    child_deduction_factor = parseInt(document.getElementById("hijos").value);
    // If receives auh, it can't deduct the child
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

    var dedudctions =
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
    var tax_base = net_income - gmni - special_deduction - special_deduction_table - dedudctions;

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
    mytext = "Monto a pagar:".concat(" $ ", special_deduction_table, " promedio mensual");
    result_div.textContent = mytext;
    $("#text_total").show();
  });
});
