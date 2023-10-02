// import CellResult from "@/mock/result/cell_result";


const Color = {
    BAD: 'red',
    GOOD: 'green',
    WARNING: 'yellow',
}

const getColor = (value) => {

    let resultColor = Color.BAD;
    if (value >= 80) {

        resultColor = Color.GOOD;
    }
    else if (value >= 50) {

        resultColor = Color.WARNING;
    }
    else {

        resultColor = Color.BAD;
    }

    return resultColor;
}

const FrameAnalytic = (resultCell, frame_name) => {

    const result = resultCell.data.result;

    let minHealth = Infinity;
    let minContent = Infinity;

    result.forEach((item) => {
        if (parseFloat(item.health.value) < minHealth) {
            minHealth = parseFloat(item.health.value);
        }
        if (parseFloat(item.content.value) < minContent) {
            minContent = parseFloat(item.content.value);
        }
    });



    const resultFrame = {
        health: {
            color: getColor(minHealth),
            value: minHealth,
        },
        content: {
            color: getColor(minContent),
            value: minContent,
        },
        frame_name: frame_name
    }

    return resultFrame;

}


export default FrameAnalytic;