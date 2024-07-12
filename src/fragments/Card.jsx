import React, { useState } from "react";
import '../css/Card.css';
import { LayoutGroup, motion } from "framer-motion";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UilTimes } from "@iconscout/react-unicons";
import Chart from 'react-apexcharts';

const Card = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <LayoutGroup>
            {expanded ? (
                <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
            ) : (
                <CompactCard param={props} setExpanded={() => setExpanded(true)} />
            )}
        </LayoutGroup>
    );
};

// CompactCard
function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
        <motion.div
            className="CompactCard"
            layoutId={`expandableCard-${param.title}`}
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow
            }}
            onClick={setExpanded}
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                />
                <span className="title">
                    {param.title}
                </span>
            </div>
            <div className="detail">
                <Png />
                <span>
                    {param.value}
                    <span>
                        24 hours
                    </span>
                </span>
            </div>
        </motion.div>
    );
}

// ExpandedCard
function ExpandedCard({ param, setExpanded }) {
    const data = {
        options: {
            chart: {
                type: 'area',
                height: 'auto',
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35
            },
            fill: {
                type: 'solid', 
                colors: ["#F5F7F8"],

            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                colors: ["#fff"],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2019-09-19T00:00:00.000Z',
                    '2019-09-19T01:30:00.000Z',
                    '2019-09-19T02:30:00.000Z',
                    '2019-09-19T03:30:00.000Z',
                    '2019-09-19T04:30:00.000Z',
                    '2019-09-19T05:30:00.000Z',
                    '2019-09-19T06:30:00.000Z',
                ],
                labels: {
                    style: {
                        colors: '#fff', // Color de las etiquetas del eje X
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#fff', // Color de la línea del eje X
                },
                axisTicks: {
                    show: true,
                    color: '#fff' // Color de las marcas del eje X
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#fff', // Color de las etiquetas del eje Y
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#fff', // Color de la línea del eje Y
                },
                axisTicks: {
                    show: true,
                    color: '#fff' // Color de las marcas del eje Y
                },
            }
        },
        series: [{
            name: 'Series 1',
            data: [30, 40, 35, 50, 49, 60, 70]
        }]
    };

    return (
        <motion.div
            className="ExpandedCard"
            style={{ background: param.color.backGround, boxShadow: param.color.boxShadow }}
            layoutId={`expandableCard-${param.title}`}
        >
            <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>
                {param.title}
            </span>
            <div className="chartContainer">
                <Chart series={param.series} type='area' options={data.options} />
            </div>
            <span>
                24 hours
            </span>
        </motion.div>
    );
}

export default Card;
