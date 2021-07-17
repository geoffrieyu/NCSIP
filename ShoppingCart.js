smallProductCode = "ult_small";
mediumProductCode = "ult_medium";
largeProductCode = "ult_large";
gb1ProductCode = "1gb";
discountCode = "1<3AMAYSIM"

smallProductName = "Unlimited 1GB";
mediumProductName = "Unlimited 2GB";
largeProductName = "Unlimited 5GB";
gb1ProductName = "1 GB Data-pack";

smallPrice = 24.90;
mediumPrice = 29.90;
largePrice = 44.90;
largePriceDiscounted = 39.90;
gb1Price = 9.90;
promocodeDiscount = 0.90;

numberOfSmall = 0;
numberOfMedium = 0;
numberOfLarge = 0;
numberOf1GB = 0;
numberOf1GBTemp = 0;

hasPromoCode = false;

simCardList = [];
simCardListName = [];

totalAmount = 0;

function AddItem(simCardList, inputValue){
    if(simCard !=6 ){
        if(inputValue == 1){
            simCardList.push(smallProductCode);
            simCardListName.push(smallProductName)
        }
        else if(inputValue == 2){
            simCardList.push(mediumProductCode);
            simCardListName.push(mediumProductName)
        }
        else if(inputValue == 3){
            simCardList.push(largeProductCode);
            simCardListName.push(largeProductName)
        }
        else if(inputValue == 4){
            simCardList.push(gb1ProductCode);
            simCardListName.push(gb1ProductName)
        }
        else if(inputValue == 5){
            simCardList.push(discountCode);
            simCardListName.push(discountCode);
            hasPromoCode = true;
        }
    }
}

function ShowCart(){
    result = [];
    if(numberOfSmall != 0)
        result.push(numberOfSmall + "x " + smallProductName);
    if(numberOfMedium != 0)
        result.push(numberOfMedium + "x " + mediumProductName);
    if(numberOfLarge != 0)
        result.push(numberOfLarge + "x " + largeProductName);
    if(numberOf1GB != 0 || numberOf1GBTemp != 0)
        result.push(numberOf1GB + numberOf1GBTemp + "x " + gb1ProductName);
    if(hasPromoCode)
        result.push(discountCode + "PROMOCODE ");

    document.getElementById("Cart").innerHTML = result.join("<br />");    
    document.getElementById("Amount").innerHTML = "Total Amount Is : $" + totalAmount.toFixed(2);
}

function AskInput(){
    let input = document.getElementById("simCard");
    
    if(input.value != 6 && input.value!= 7){
        AddItem(simCardList, input.value)
        document.getElementById("Cart").innerHTML = simCardListName.join('<br />');
        document.getElementById("simCard").value = "";
        input.focus();
    }
    else if(input.value == 6){
        GetTotalAmount();
        ShowCart();
    }
    else if(input.value == 7){
        location.reload();
    }
}

function GetTotalAmount(){

    totalAmountOfSmall = 0;
    totalAmountOfMedium = 0;
    totalAmountOfLarge = 0;
    totalAmountOf1GB = 0;

    GetTotalNumberOfOrders();

    totalAmountOfSmall = GetTotalSmallAmount(numberOfSmall, totalAmountOfSmall);

    totalAmountOfMedium = GetTotalMediumAmount(numberOfMedium, totalAmountOfMedium);

    totalAmountOfLarge = GetTotalLargeAmount(numberOfLarge, totalAmountOfLarge);

    totalAmountOf1GB = GetTotal1GBAmount(numberOf1GB, totalAmountOf1GB);

    GetTotalWithPromoCode(totalAmountOfSmall, totalAmountOfMedium, totalAmountOfLarge, totalAmountOf1GB);
}

function GetTotalNumberOfOrders() {

    for(let i=0; i < simCardList.length; i++){
        if(simCardList[i] == smallProductCode){
            numberOfSmall++;
        }

        else if(simCardList[i]  == mediumProductCode){
            numberOfMedium++;
            numberOf1GBTemp++;
        }

        else if(simCardList[i]  == largeProductCode){
            numberOfLarge++;
        }

        else if(simCardList[i]  == gb1ProductCode){
            numberOf1GB++;
        }
    }
}

function GetTotalSmallAmount(numberOfSmall, totalAmountOfSmall) {
    if(numberOfSmall != 0){
        if(numberOfSmall >= 3){

            totalBundleOf3 = 0;
            remainder = 0;

            totalBundleOf3 = numberOfSmall/3;
            totalAmountOfSmall = totalBundleOf3 * (smallPrice + smallPrice);

            remainder = numberOfSmall % 3;
            if(remainder != 0){
                totalAmountOfSmall =  totalAmountOfSmall + (smallPrice * remainder);
            }

        }else{
            totalAmountOfSmall = smallPrice * numberOfSmall;
        }
    }
    return totalAmountOfSmall;
}

function GetTotalMediumAmount(umberOfMedium, totalAmountOfMedium) {
    if(numberOfMedium !=0){
        totalAmountOfMedium = numberOfMedium * mediumPrice;
    }
    
    return totalAmountOfMedium;
}

function GetTotalLargeAmount(numberOfLarge, totalAmountOfLarge) {
    if(numberOfLarge != 0){
        if(numberOfLarge < 3){
            totalAmountOfLarge = numberOfLarge * largePrice;
        }else{
            totalAmountOfLarge = numberOfLarge * largePriceDiscounted;
        }
    }
    return totalAmountOfLarge;
}

function GetTotal1GBAmount(numberOf1GB, totalAmountOf1GB) {
    if(numberOf1GB != 0){
        totalAmountOf1GB = numberOf1GB * gb1Price;
    }
    return totalAmountOf1GB;
}


function GetTotalWithPromoCode(totalAmountOfSmall,totalAmountOfMedium,totalAmountOfLarge, totalAmountOf1GB) {

if(hasPromoCode)
    totalAmount = (totalAmountOfSmall + totalAmountOfMedium + totalAmountOfLarge + totalAmountOf1GB) * promocodeDiscount;
else
    totalAmount = totalAmountOfSmall + totalAmountOfMedium + totalAmountOfLarge + totalAmountOf1GB;
}


