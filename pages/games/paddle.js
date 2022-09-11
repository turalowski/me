import { useEffect, useRef, useState } from 'react'

const AREA_WIDTH = 800
const AREA_HEIGHT = 500
const FPS = 60
let BALL_X = 75
let BALL_Y = 75
let BALL_SPEED_X = 5
let BALL_SPEED_Y = 2

let PADDLE1_X = 0
let PADDLE1_Y = 250
let PADDLE_WIDTH = 10
let PADDLE_HEIGHT = 100

let PADDLE2_X = AREA_WIDTH - PADDLE_WIDTH
let PADDLE2_Y = 0


function Paddle() {
    const canvasRef = useRef(null)
    const [isGameOver, setIsGameOver] = useState(false)

    function getMousePosition(event) {
        const rectangle = canvasRef.current?.getBoundingClientRect()
        const root = document.documentElement
        const mouseX = event.clientX - rectangle.left - root.scrollLeft
        const mouseY = event.clientY - rectangle.top - root.scrollTop

        const coordinations = {
            x: mouseX,
            y: mouseY,
        }
        return coordinations
    }
    function drawRectangle(
        canvasContext,
        { topLeftX, topLeftY, width, height, color }
    ) {
        canvasContext.fillStyle = color
        canvasContext.fillRect(topLeftX, topLeftY, width, height)
    }

    function drawCircle(
        canvasContext,
        { centerX, centerY, radius, color }
    ) {
        canvasContext.fillStyle = color
        canvasContext.beginPath()
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
        canvasContext.fill()
    }

    function moveBall() {
        if (BALL_X > AREA_WIDTH || BALL_X < 0) {
            BALL_SPEED_X *= -1
        }
        if (BALL_Y > AREA_HEIGHT || BALL_Y < 0) {
            BALL_SPEED_Y *= -1
        }

        if (BALL_X < PADDLE_WIDTH || BALL_X > AREA_WIDTH - PADDLE_WIDTH) {
            if (
                BALL_X < PADDLE_WIDTH &&
                BALL_Y > PADDLE1_Y &&
                BALL_Y < PADDLE1_Y + PADDLE_HEIGHT
            ) {
                BALL_SPEED_X *= -1
            } else if (
                BALL_X > AREA_WIDTH - PADDLE_WIDTH &&
                BALL_Y > PADDLE2_Y &&
                BALL_Y < PADDLE2_Y + PADDLE_HEIGHT
            ) {
                BALL_SPEED_X *= -1
            }
            else {
                setIsGameOver(true);
            }
        }

        BALL_X = BALL_X + BALL_SPEED_X
        BALL_Y = BALL_Y + BALL_SPEED_Y
    }

    function drawFigures(canvasContext) {
        // Draw game area
        drawRectangle(canvasContext, {
            topLeftX: 0,
            topLeftY: 0,
            width: AREA_WIDTH,
            height: AREA_HEIGHT,
            color: '#a5d6a7',
        })

        // Draw a white ball
        drawCircle(canvasContext, {
            centerX: BALL_X,
            centerY: BALL_Y,
            radius: 10,
            color: 'red',
        })

        // Draw a paddle
        drawRectangle(canvasContext, {
            topLeftX: PADDLE1_X,
            topLeftY: PADDLE1_Y,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            color: 'white',
        })

        drawRectangle(canvasContext, {
            topLeftX: PADDLE2_X,
            topLeftY: PADDLE2_Y,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            color: 'white',
        })
    }

    useEffect(() => {
        if (canvasRef.current) {
            const canvasContext = canvasRef.current.getContext('2d')
            if (canvasContext === null) {
                throw new Error('Canvas context is null')
            }

            canvasRef.current.addEventListener('mousemove', function (event) {
                const mousePosition = getMousePosition(event)
                if (
                    mousePosition.y - PADDLE_HEIGHT / 2 >= 0 &&
                    mousePosition.y + PADDLE_HEIGHT / 2 <= 500
                ) {
                    PADDLE1_Y = mousePosition.y - PADDLE_HEIGHT / 2
                    PADDLE2_Y = mousePosition.y - PADDLE_HEIGHT / 2
                }
            })
            setInterval(() => {
                moveBall()
                drawFigures(canvasContext)
            }, 1000 / FPS)
        }
    }, [canvasRef])

    if(isGameOver) {
        return (<div>Game over</div>)
    }
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <canvas
                ref={canvasRef}
                width={AREA_WIDTH}
                height={AREA_HEIGHT}
                style={{ borderRadius: '25px' }}
            />
        </div>
    )
}

export default Paddle
