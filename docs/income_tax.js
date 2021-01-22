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
      0,
      47669.16,
      95338.32,
      143007.48,
      190676.65,
      286014.96,
      381353.28,
      572029.92,
      762706.57,
    ],
    TABLA_ALICUOTA_BASES: [
      0,
      2383.46,
      6673.68,
      12393.98,
      19544.36,
      37658.64,
      59586.45,
      111069.14,
      170178.9,
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
      0,
      64532.64,
      129065.29,
      193597.93,
      258130.58,
      387195.86,
      516261.14,
      774391.71,
      1032522.3,
    ],
    TABLA_ALICUOTA_BASES: [
      0,
      3226.63,
      9034.57,
      16778.49,
      26458.39,
      50980.79,
      80665.8,
      150361.06,
      230381.54,
    ],
  },
};

//Functions
$(document).ready(function () {
  var retirement_contribution = APORTE_JUBILATORIO;
  var healt_insurance_contribution = APORTE_OBRA_SOCIAL;
  var gmni = CONSTANTS[2020].GMNI;
  var child_deduction_factor = ZERO;
  var special_deduction = ZERO;
  var spouse_deduction = ZERO;
  var child_deduction = ZERO;
  var childs_amount = ZERO;
  var year_val = ZERO;
  var other_father_deducts = FALSE;
  var can_deduct_spouse = FALSE;
  var is_patagonia = FALSE;
  var receives_auh = FALSE;

  var div_gmni = document.getElementById("myGMNI");
  div_gmni.textContent = "$".concat(" ", gmni, " al año");

  //Year parsing
  //Here and in the parse of the region the gmni is calculated
  //this is to show it in the middle of the programm
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

  //spouse
  $("#conyuge").on("change", function () {
    can_deduct_spouse = document.getElementById("conyuge").value;
  });

  //childs
  $("#hijos")
    .on("input", function () {
      childs_amount = parseInt(document.getElementById("hijos").value);
      if (childs_amount === ZERO) {
        //Without childs
        $("#hijos_label_1").hide();
        $("#hijos_label_2").hide();
        $("#asignaciones").hide();
        $("#otro_padre_deduce").hide();
      } else {
        //With childs
        $("#hijos_label_1").show();
        $("#asignaciones").show();
      }
    })
    .trigger("input");

  //Checking if receives auh
  $("#asignaciones").on("change", function () {
    receives_auh = document.getElementById("asignaciones").value;
    if (receives_auh === FALSE) {
      $("#otro_padre_deduce").show();
      $("#hijos_label_2").show();
    } else {
      $("#otro_padre_deduce").hide();
      $("#hijos_label_2").hide();
    }
  });

  //checking if the other father deducts his childs
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
      (document.getElementById("asignaciones").value === "" && childs_amount != ZERO) ||
      (document.getElementById("otro_padre_deduce").value === "" &&
        childs_amount != ZERO &&
        receives_auh === FALSE)
    ) {
      var result_div = document.getElementById("text_total");
      mytext = "No se completaron todas las opciones";
      result_div.textContent = mytext;
      $("#text_total").show();
      return 0;
    }

    // With the gross salary, we calculate the yearly net income,
    // it is multiplied by months plus because we are adding the aguinaldo
    var gross_salry = $("#sueldo_bruto").val() * MONTHS_PLUS;
    var net_income =
      gross_salry -
      gross_salry * retirement_contribution -
      gross_salry * healt_insurance_contribution;

    //The spouse deduction value depends if is from Patagonia
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

    // domestic employee and rent deduction have a max yearly deduction of #gmni per year
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
    var tax_base = net_income - gmni - special_deduction - dedudctions;

    //for testing-----------------------
    var div_baseimp = document.getElementById("div_baseimp");
    div_baseimp.textContent = "".concat("", tax_base);

    //This is all the checking to see where is the tax base in the alicuota table.
    //Doing that I get the yealry tax payment, later I divide it by 12 to get the monthly value.
    if (tax_base < ZERO) {
      yearly_payement = ZERO;

      //para testeo
      var div_baseimp = document.getElementById("div_baseimp");
      div_baseimp.textContent = "este es el monto ".concat(
        "",
        tax_base,
        ", estamos en la primera categoria, ",
        " este es el yearly: ",
        yearly_payement
      );
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

          //para testeo
          var div_baseimp = document.getElementById("div_baseimp");
          div_baseimp.textContent = "este es el monto ".concat(
            "",
            tax_base,
            ", esta es la i : ",
            i,
            " este es el yearly: ",
            yearly_payement
          );
        }
        i++;
      }
    } else if (tax_base >= CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) {
      yearly_payement =
        CONSTANTS[year_val].TABLA_ALICUOTA_BASES[SIZE] +
        (tax_base - CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) *
          CONSTANTS[year_val].TABLA_ALICUOTA_PORCENTAJES[SIZE];

      //para testeo
      var div_baseimp = document.getElementById("div_baseimp");
      div_baseimp.textContent = "este es el monto ".concat(
        "",
        tax_base,
        ", estamos en la ultima categoria, ",
        " este es el yearly: ",
        yearly_payement
      );
    }

    var monthly_payement = yearly_payement / MONTHS;
    monthly_payement = monthly_payement.toFixed(2);

    var result_div = document.getElementById("text_total");
    mytext = "Monto a pagar:".concat(" $ ", monthly_payement, " promedio mensual");
    result_div.textContent = mytext;
    $("#text_total").show();
  });
});
