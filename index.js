function triangle(side1, sideType1, side2, sideType2) {
    const typeDefinitions = {
        leg: "leg",
        hypotenuse: "hypotenuse",
        adjacentAngle: "adjacent angle",
        oppositeAngle: "opposite angle",
        angle: "angle"
    };

    const MINIMUM_SIDE_LENGTH = 0.0001;
    const MAXIMUM_SIDE_LENGTH = 1000000;
    const MINIMUM_ANGLE = 0;
    const MAXIMUM_ANGLE = 90;

    if (!Object.values(typeDefinitions).includes(sideType1) || !Object.values(typeDefinitions).includes(sideType2)) {
        console.log("Вказано неправильний тип. Перевірте інструкцію ще раз.");
        return "failed";
    }

    const isTypeAngle = type => [typeDefinitions.angle, typeDefinitions.adjacentAngle, typeDefinitions.oppositeAngle].includes(type);
    if (isTypeAngle(sideType1) && isTypeAngle(sideType2)) {
        console.log("Недостатньо даних для вирішення трикутника (надано лише кути).");
        return "failed";
    }

    const convertDegreesToRadians = degrees => degrees * Math.PI / 180;
    const convertRadiansToDegrees = radians => radians * 180 / Math.PI;
    const sideIsValid = side => typeof side === "number" && side > MINIMUM_SIDE_LENGTH && side <= MAXIMUM_SIDE_LENGTH;
    const angleIsValid = angle => typeof angle === "number" && angle > MINIMUM_ANGLE && angle < MAXIMUM_ANGLE;

    let sideA, sideB, sideC, angleAlpha, angleBeta;

    if (sideType1 === typeDefinitions.leg && sideType2 === typeDefinitions.leg) {
        sideA = side1;
        sideB = side2;
        if (!sideIsValid(sideA) || !sideIsValid(sideB)) {
            console.log(`Довжини сторін повинні бути в межах (${MINIMUM_SIDE_LENGTH}, ${MAXIMUM_SIDE_LENGTH}].`);
            return "failed";
        }
        sideC = Math.sqrt(sideA * sideA + sideB * sideB);
        angleAlpha = convertRadiansToDegrees(Math.asin(sideA / sideC));
        angleBeta = 90 - angleAlpha;
    } else if ((sideType1 === typeDefinitions.leg && sideType2 === typeDefinitions.hypotenuse) || (sideType1 === typeDefinitions.hypotenuse && sideType2 === typeDefinitions.leg)) {
        sideA = sideType1 === typeDefinitions.leg ? side1 : side2;
        sideC = sideType1 === typeDefinitions.hypotenuse ? side1 : side2;
        if (!sideIsValid(sideA) || !sideIsValid(sideC)) {
            console.log(`Довжини сторін повинні бути в межах (${MINIMUM_SIDE_LENGTH}, ${MAXIMUM_SIDE_LENGTH}].`);
            return "failed";
        }
        if (sideA >= sideC) {
            console.log("Катет повинен бути менше гіпотенузи.");
            return "failed";
        }
        sideB = Math.sqrt(sideC * sideC - sideA * sideA);
        angleAlpha = convertRadiansToDegrees(Math.asin(sideA / sideC));
        angleBeta = 90 - angleAlpha;
    } else if ((sideType1 === typeDefinitions.leg && sideType2 === typeDefinitions.oppositeAngle) || (sideType1 === typeDefinitions.oppositeAngle && sideType2 === typeDefinitions.leg)) {
        sideA = sideType1 === typeDefinitions.leg ? side1 : side2;
        angleAlpha = sideType1 === typeDefinitions.oppositeAngle ? side1 : side2;
        if (!sideIsValid(sideA)) {
            console.log(`Довжина сторони повинна бути в межах (${MINIMUM_SIDE_LENGTH}, ${MAXIMUM_SIDE_LENGTH}].`);
            return "failed";
        }
        if (!angleIsValid(angleAlpha)) {
            console.log(`Кут має бути в межах (${MINIMUM_ANGLE}, ${MAXIMUM_ANGLE}).`);
            return "failed";
        }
        sideC = sideA / Math.sin(convertDegreesToRadians(angleAlpha));
        sideB = Math.sqrt(sideC * sideC - sideA * sideA);
        angleBeta = 90 - angleAlpha;
    } else if ((sideType1 === typeDefinitions.leg && sideType2 === typeDefinitions.adjacentAngle) || (sideType1 === typeDefinitions.adjacentAngle && sideType2 === typeDefinitions.leg)) {
        sideB = sideType1 === typeDefinitions.leg ? side1 : side2;
        angleAlpha = sideType1 === typeDefinitions.adjacentAngle ? side1 : side2;
        if (!sideIsValid(sideB)) {
            console.log(`Довжина сторони повинна бути в межах (${MINIMUM_SIDE_LENGTH}, ${MAXIMUM_SIDE_LENGTH}].`);
            return "failed";
        }
        if (!angleIsValid(angleAlpha)) {
            console.log(`Кут має бути в межах (${MINIMUM_ANGLE}, ${MAXIMUM_ANGLE}).`);
            return "failed";
        }
        sideC = sideB / Math.cos(convertDegreesToRadians(angleAlpha));
        sideA = sideC * Math.sin(convertDegreesToRadians(angleAlpha));
        angleBeta = 90 - angleAlpha;
    } else if ((sideType1 === typeDefinitions.hypotenuse && isTypeAngle(sideType2)) || (isTypeAngle(sideType1) && sideType2 === typeDefinitions.hypotenuse)) {
        sideC = sideType1 === typeDefinitions.hypotenuse ? side1 : side2;
        angleAlpha = sideType1 === typeDefinitions.angle ? side1 : side2;
        if (!sideIsValid(sideC)) {
            console.log(`Гіпотенуза має бути в межах (${MINIMUM_SIDE_LENGTH}, ${MAXIMUM_SIDE_LENGTH}].`);
            return "failed";
        }
        if (!angleIsValid(angleAlpha)) {
            console.log(`Кут має бути в межах (${MINIMUM_ANGLE}, ${MAXIMUM_ANGLE}).`);
            return "failed";
        }
        sideA = sideC * Math.sin(convertDegreesToRadians(angleAlpha));
        sideB = sideC * Math.cos(convertDegreesToRadians(angleAlpha));
        angleBeta = 90 - angleAlpha;
    } else {
        console.log("Недійсна комбінація типів. Будь ласка, зверніться до інструкцій.");
        return "failed";
    }

    console.log(`a = ${sideA.toFixed(2)}, b = ${sideB.toFixed(2)}, c = ${sideC.toFixed(2)}`);
    console.log(`α = ${angleAlpha.toFixed(2)}°, β = ${angleBeta.toFixed(2)}°`);
    return "success";
}
