//Constants
const ZERO = 0;
const SIZE = 8; //Last index of alicuota table
const TRUE = "1";
const FALSE = "0";
const FIFTY = 0.5;
const APORTE_JUBILATORIO = 0.11;
const APORTE_OBRA_SOCIAL = 0.06;
const NO_TAX = 2 ** 52;

//Here you can add a year with its values
const CONSTANTS = {
    2024_1: {
        TOPE_SEGUROS: 16320.45,
        GMNI: 257586.25,
        DEDUCCION_CONYUGE: 242594.58,
        DEDUCCION_POR_HIJO: 122341.33,
        DEDUCCION_ESPECIAL_EMPLEADO: 1236414,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 100000.00, 200000.00, 300000.00, 450000.00, 900000.00, 1350000.00, 2025000.00, 3037500.00
        ],
        TABLA_ALICUOTA_BASES: [
            0, 5000.00, 14000.00, 26000.00, 48500.00, 134000.00, 237500.00, 419750.00, 733625.00
        ],
    },
    2024_2: {
        TOPE_SEGUROS: 16320.45,
        GMNI: 291974.01,
        DEDUCCION_CONYUGE: 274980.96,
        DEDUCCION_POR_HIJO: 138673.90,
        DEDUCCION_ESPECIAL_EMPLEADO: 1401475.27,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 113350.00, 226700.00, 340050.00, 510075.00, 1020150.00, 1530225.00, 2295337.50, 3443006.25
            ],
        TABLA_ALICUOTA_BASES: [
            0, 5667.50, 15869.00, 29471.00, 54974.75, 151889.00, 269206.25, 475786.63, 831563.94
        ],
    },
    2025_1: {
        TOPE_SEGUROS: 16320.45,
        GMNI: 326355.70,
        DEDUCCION_CONYUGE: 307361.61,
        DEDUCCION_POR_HIJO: 155003.58,
        DEDUCCION_ESPECIAL_EMPLEADO: 1566507.35,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 126697.64, 253395.28, 380092.92, 570139.38, 1140278.75, 1710418.13, 2565627.20, 3848440.79
            ],
        TABLA_ALICUOTA_BASES: [
            0, 6334.88, 17737.67, 32941.39, 61448.36, 169774.84, 300906.89, 531813.34, 929485.56
        ],
    },
    2025_2: {
        TOPE_SEGUROS: 16320.45,
        GMNI: 375625.46,
        DEDUCCION_CONYUGE: 353763.84,
        DEDUCCION_POR_HIJO: 178404.40,
        DEDUCCION_ESPECIAL_EMPLEADO: 1803002.21,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 145825.12, 291650.24, 437475.36, 656213.04, 1312426.09, 1968639.13, 2952958.69, 4429438.04
            ],
        TABLA_ALICUOTA_BASES: [
            0, 7291.26, 20415.51, 37914.53, 70725.18, 195405.66, 346334.66, 612100.95, 1069809.54
        ],
    },
    2026_1: {
        TOPE_SEGUROS: 62789.345,
        GMNI: 429316.88,
        DEDUCCION_CONYUGE: 404330.39,
        DEDUCCION_POR_HIJO: 203905.29,
        DEDUCCION_ESPECIAL_EMPLEADO: 2060721.0,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 166669.17, 333338.35, 500007.52, 750011.28, 1500022.57, 2250033.85, 3375050.77, 5062576.16],
        TABLA_ALICUOTA_BASES: [
            0, 8333.46, 23333.68, 43333.99, 80834.55, 223336.69, 395839.29, 699593.86, 1222726.73],
    },
};


//Functions
$(document).ready(function() {
    // Hardcoded to show a number in the spouse div, it changes when the year or the region are selected
    var gmni = CONSTANTS[20251].GMNI;
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
    var receives_auh = FALSE;

    var div_gmni = document.getElementById("myGMNI");
    div_gmni.textContent = "$".concat(" ", gmni);

    //Year parsing
    //Here and in the parse of the region the gmni is calculated
    //to show it in the middle of the programm
    $("#select_year").on("change", function() {
        year_val = parseInt(document.getElementById("select_year").value);
        gmni = CONSTANTS[year_val].GMNI;
        special_deduction = CONSTANTS[year_val].DEDUCCION_ESPECIAL_EMPLEADO;
        div_gmni.textContent = "$".concat(" ", gmni, " al año");
        monthly_salary = parseInt(document.getElementById("sueldo_neto").value);
        if (monthly_salary === ZERO) {
            $("#no_tax_message").hide();
        } else if (monthly_salary <= CONSTANTS[year_val].SUELO_IMPUESTO) {
            $("#no_tax_message").show();
        } else {
            $("#no_tax_message").hide();
        }
    });

    //salary
    $("#sueldo_neto")
        .on("input", function() {
            monthly_salary = parseInt(document.getElementById("sueldo_neto").value);
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
    $("#conyuge").on("change", function() {
        can_deduct_spouse = document.getElementById("conyuge").value;
    });

    //children
    $("#hijos")
        .on("input", function() {
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
        .on("input", function() {
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
    $("#asignaciones").on("change", function() {
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
    $("#otro_padre_deduce").on("change", function() {
        other_father_deducts = document.getElementById("otro_padre_deduce").value;
    });

    //-------------------Button-------------------
    $("#button_calculate").on("click", function() {
        var monthly_payement = ZERO;
        var i = ZERO;
        //checking that all the selects are selected when neccesary
        if (
            document.getElementById("select_year").value === "" ||
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
  
        var net_income = $("#sueldo_neto").val();

        if (can_deduct_spouse === TRUE) {
            spouse_deduction = CONSTANTS[year_val].DEDUCCION_CONYUGE;
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
        child_deduction = child_deduction_factor * CONSTANTS[year_val].DEDUCCION_POR_HIJO;

        // domestic employee and rent deduction have a max yearly deduction of gmni per year
        var domestic_employee_deduction = $("#servicio_domestico").val();
        if (domestic_employee_deduction >= gmni) {
            domestic_employee_deduction = gmni;
        }
        var rent_deduction = $("#alquiler").val();
        if (rent_deduction >= gmni) {
            rent_deduction = gmni;
        }

        //life insurance and retirement insurance have a max yearly deduction on his own
        var life_insurance_deduction = $("#seguro_vida").val();
        if (life_insurance_deduction >= CONSTANTS[year_val].TOPE_SEGUROS) {
            life_insurance_deduction = CONSTANTS[year_val].TOPE_SEGUROS;
        }
        var retirement_insurance_deduction = $("#seguro_retiro").val();
        if (retirement_insurance_deduction >= CONSTANTS[year_val].TOPE_SEGUROS) {
            retirement_insurance_deduction = CONSTANTS[year_val].TOPE_SEGUROS;
        }

        //These have no max deduction per year
        var prepaid_health_deduction = $("#prepaga").val();
        var other_deduction = $("#otro").val();

        var deductions =
            parseInt(Number(spouse_deduction)) +
            parseInt(Number(child_deduction)) +
            parseInt(Number(domestic_employee_deduction)) +
            parseInt(Number(retirement_insurance_deduction)) +
            parseInt(Number(life_insurance_deduction)) +
            parseInt(Number(rent_deduction)) +
            parseInt(Number(prepaid_health_deduction)) +
            parseInt(Number(other_deduction));

        //The tax base is the number that is going to be in the alicuota table
        var tax_base = net_income - gmni - special_deduction - deductions;

        //This is all the checking to see where is the tax base in the alicuota table.
        //Doing that I get the yealry tax payment, later I divide it by 12 to get the monthly value.
        if (tax_base < ZERO) {
            monthly_payement = ZERO;
        } else if (tax_base < CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) {
            while (monthly_payement === ZERO) {
                if (
                    tax_base >= CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i] &&
                    tax_base < CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i + 1]
                ) {
                    monthly_payement =
                        CONSTANTS[year_val].TABLA_ALICUOTA_BASES[i] +
                        (tax_base - CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[i]) *
                        CONSTANTS[year_val].TABLA_ALICUOTA_PORCENTAJES[i];
                }
                i++;
            }
        } else if (tax_base >= CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) {
            monthly_payement =
                CONSTANTS[year_val].TABLA_ALICUOTA_BASES[SIZE] +
                (tax_base - CONSTANTS[year_val].TABLA_ALICUOTA_TOPES[SIZE]) *
                CONSTANTS[year_val].TABLA_ALICUOTA_PORCENTAJES[SIZE];
        }

        monthly_payement = monthly_payement.toFixed(2);

        var result_div = document.getElementById("text_total");
        mytext = "Monto a pagar:".concat(" $ ", monthly_payement, " en el mes");
        result_div.textContent = mytext;
        $("#text_total").show();
    });
});