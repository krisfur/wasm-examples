// `cargo build --target wasm32-unknown-unknown` builds the exact same code for the browser.
// No #[cfg] branches or platform shims as macroquad abstracts the window, input, and GL the same way on both.

use macroquad::prelude::*;

struct Ball {
    pos: Vec2,
    vel: Vec2,
    color: Color,
}

#[macroquad::main("Macroquad — desktop & web")]
async fn main() {
    let mut balls: Vec<Ball> = Vec::new();
    let palette = [RED, ORANGE, YELLOW, GREEN, SKYBLUE, PURPLE, PINK];

    loop {
        clear_background(BLACK);

        // Click to spawn a ball that's flung toward the cursor.
        if is_mouse_button_pressed(MouseButton::Left) {
            let pos = mouse_position().into();
            balls.push(Ball {
                pos,
                vel: vec2(rand::gen_range(-4.0, 4.0), rand::gen_range(-6.0, -2.0)),
                color: palette[rand::gen_range(0, palette.len())],
            });
        }

        // Gravity towards the cursor and bounce off the floor.
        let mouse: Vec2 = mouse_position().into();
        for b in balls.iter_mut() {
            let pull = (mouse - b.pos).normalize_or_zero() * 0.25;
            b.vel += pull + vec2(0.0, 0.15);
            b.pos += b.vel;
            if b.pos.y > screen_height() - 12.0 {
                b.pos.y = screen_height() - 12.0;
                b.vel.y *= -0.7;
            }
            draw_circle(b.pos.x, b.pos.y, 12.0, b.color);
        }

        draw_text(
            &format!("{} balls; click to add; {} fps", balls.len(), get_fps()),
            16.0,
            28.0,
            26.0,
            WHITE,
        );

        next_frame().await;
    }
}
