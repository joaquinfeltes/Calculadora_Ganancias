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
        GMNI: 279149.80,
        DEDUCCION_CONYUGE: 262903.12,
        DEDUCCION_POR_HIJO: 132583,
        DEDUCCION_ESPECIAL_EMPLEADO: 1339919.02,
        TABLA_ALICUOTA_PORCENTAJES: [0.05, 0.09, 0.12, 0.15, 0.19, 0.23, 0.27, 0.31, 0.35],
        TABLA_ALICUOTA_TOPES: [
            0, 108371.39, 216742.78, 325114.17, 487671.25, 975342.50, 1463013.75, 2194520.62, 3291780.93
        ],
        TABLA_ALICUOTA_BASES: [
            0, 5418.57, 15171.99, 28176.56, 52560.12, 145217.66, 257382.05, 454888.90, 795039.60
        ],
    },
};

//Functions
$(document).ready(function() {
    // Hardcoded to show a number in the spouse div, it changes when the year or the region are selected
    var gmni = CONSTANTS[2024_1].GMNI;
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