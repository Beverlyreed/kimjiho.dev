package dev.kimjihodev.chargefx;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RadialGradient;
import android.graphics.Shader;
import android.view.View;
import android.os.Handler;
import android.os.Looper;
import java.util.HashMap;
import java.util.Map;

final class DreamAnimationView extends View {
    private static final long FRAME_DELAY_MS = 33;
    private static final Map<String, int[]> PALETTES = createPalettes();

    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final long startedAt = System.currentTimeMillis();
    private final int[] palette;
    private final Runnable frame = new Runnable() {
        @Override
        public void run() {
            invalidate();
            handler.postDelayed(this, FRAME_DELAY_MS);
        }
    };
    private int percentage = -1;
    private boolean charging = true;

    DreamAnimationView(Context context) {
        super(context);
        setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        String selectedAnimation = context
            .getSharedPreferences(ChargingNotificationReceiver.PREFERENCES, Context.MODE_PRIVATE)
            .getString("selectedAnimation", "liquid-pulse");
        int[] selectedPalette = PALETTES.get(selectedAnimation);
        palette = selectedPalette != null ? selectedPalette : new int[] {
            Color.rgb(173, 222, 239),
            Color.rgb(166, 158, 232)
        };
    }

    void start() {
        handler.removeCallbacks(frame);
        handler.post(frame);
    }

    void stop() {
        handler.removeCallbacks(frame);
    }

    void setBattery(int value, boolean isCharging) {
        percentage = value;
        charging = isCharging;
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        float width = getWidth();
        float height = getHeight();
        float scale = Math.min(width, height);
        float time = (System.currentTimeMillis() - startedAt) / 1000f;
        float driftX = (float) Math.sin(time / 19f) * scale * 0.035f;
        float driftY = (float) Math.cos(time / 23f) * scale * 0.035f;
        float centerX = width * 0.5f + driftX;
        float centerY = height * 0.43f + driftY;
        float radius = scale * 0.18f;

        canvas.drawColor(Color.rgb(6, 9, 17));
        drawAmbientGlow(canvas, centerX, centerY, scale);
        drawOrbit(canvas, centerX, centerY, radius * 1.35f, time);
        drawGlassCore(canvas, centerX, centerY, radius, time);
        drawParticles(canvas, centerX, centerY, radius, time);
        drawReadout(canvas, width, height, centerY, scale);
    }

    private void drawAmbientGlow(Canvas canvas, float x, float y, float scale) {
        paint.setShader(
            new RadialGradient(
                x,
                y,
                scale * 0.48f,
                new int[] { withAlpha(palette[0], 35), withAlpha(palette[1], 16), Color.TRANSPARENT },
                null,
                Shader.TileMode.CLAMP
            )
        );
        canvas.drawCircle(x, y, scale * 0.48f, paint);
        paint.setShader(null);
    }

    private void drawOrbit(Canvas canvas, float x, float y, float radius, float time) {
        canvas.save();
        canvas.rotate(-28 + time * 7f, x, y);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1.3f);
        paint.setColor(withAlpha(palette[0], 125));
        canvas.drawOval(x - radius * 1.55f, y - radius * 0.47f, x + radius * 1.55f, y + radius * 0.47f, paint);
        paint.setStrokeWidth(0.7f);
        paint.setColor(withAlpha(Color.WHITE, 50));
        canvas.drawOval(x - radius * 1.28f, y - radius * 0.36f, x + radius * 1.28f, y + radius * 0.36f, paint);
        canvas.restore();
        paint.setStyle(Paint.Style.FILL);
    }

    private void drawGlassCore(Canvas canvas, float x, float y, float radius, float time) {
        float pulse = 1f + (float) Math.sin(time * 1.2f) * 0.025f;
        float coreRadius = radius * pulse;
        paint.setShader(
            new RadialGradient(
                x - coreRadius * 0.32f,
                y - coreRadius * 0.4f,
                coreRadius * 1.85f,
                new int[] {
                    Color.rgb(249, 253, 255),
                    withAlpha(palette[0], 225),
                    withAlpha(palette[1], 190),
                    Color.rgb(30, 38, 62)
                },
                new float[] { 0f, 0.18f, 0.56f, 1f },
                Shader.TileMode.CLAMP
            )
        );
        canvas.drawCircle(x, y, coreRadius, paint);
        paint.setShader(null);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(1.4f);
        paint.setColor(withAlpha(Color.WHITE, 185));
        canvas.drawCircle(x, y, coreRadius, paint);
        paint.setStyle(Paint.Style.FILL);

        paint.setShader(
            new RadialGradient(
                x - coreRadius * 0.38f,
                y - coreRadius * 0.48f,
                coreRadius * 0.62f,
                new int[] { withAlpha(Color.WHITE, 90), Color.TRANSPARENT },
                null,
                Shader.TileMode.CLAMP
            )
        );
        canvas.drawCircle(x, y, coreRadius, paint);
        paint.setShader(null);
        drawBolt(canvas, x, y, coreRadius * 0.27f);
    }

    private void drawBolt(Canvas canvas, float x, float y, float size) {
        android.graphics.Path bolt = new android.graphics.Path();
        bolt.moveTo(x + size * 0.17f, y - size);
        bolt.lineTo(x - size * 0.52f, y + size * 0.03f);
        bolt.lineTo(x - size * 0.04f, y + size * 0.03f);
        bolt.lineTo(x - size * 0.2f, y + size);
        bolt.lineTo(x + size * 0.57f, y - size * 0.14f);
        bolt.lineTo(x + size * 0.1f, y - size * 0.14f);
        bolt.close();
        paint.setColor(Color.WHITE);
        canvas.drawPath(bolt, paint);
    }

    private void drawParticles(Canvas canvas, float x, float y, float radius, float time) {
        for (int i = 0; i < 7; i++) {
            float angle = (float) (i * Math.PI * 2 / 7 + time * (0.13 + i * 0.012));
            float orbitRadius = radius * (1.7f + (i % 3) * 0.22f);
            float particleX = x + (float) Math.cos(angle) * orbitRadius;
            float particleY = y + (float) Math.sin(angle) * orbitRadius * 0.65f;
            int alpha = 115 + (int) (Math.sin(time * 1.7f + i) * 75);
            paint.setColor(withAlpha(palette[i % 2], alpha));
            canvas.drawCircle(particleX, particleY, Math.max(1.5f, radius * 0.025f), paint);
        }
    }

    private void drawReadout(Canvas canvas, float width, float height, float centerY, float scale) {
        float top = Math.min(height - scale * 0.19f, centerY + scale * 0.31f);
        paint.setTextAlign(Paint.Align.CENTER);
        paint.setColor(withAlpha(Color.WHITE, 232));
        paint.setTextSize(scale * 0.105f);
        paint.setTypeface(android.graphics.Typeface.create("sans-serif-light", android.graphics.Typeface.NORMAL));
        canvas.drawText(percentage >= 0 ? percentage + "%" : "--%", width * 0.5f, top, paint);

        paint.setColor(withAlpha(Color.rgb(190, 205, 224), 210));
        paint.setTextSize(scale * 0.027f);
        paint.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.NORMAL));
        canvas.drawText(charging ? "CHARGING" : "CONNECTED", width * 0.5f, top + scale * 0.055f, paint);
        canvas.drawText("ChargeFX", width * 0.5f, top + scale * 0.105f, paint);
        paint.setTextAlign(Paint.Align.LEFT);

        float lineWidth = scale * 0.1f;
        float lineY = top + scale * 0.14f;
        paint.setColor(withAlpha(Color.WHITE, 42));
        canvas.drawRoundRect(
            width * 0.5f - lineWidth * 0.5f,
            lineY,
            width * 0.5f + lineWidth * 0.5f,
            lineY + scale * 0.004f,
            scale * 0.003f,
            scale * 0.003f,
            paint
        );
        if (percentage >= 0) {
            paint.setColor(palette[0]);
            canvas.drawRoundRect(
                width * 0.5f - lineWidth * 0.5f,
                lineY,
                width * 0.5f - lineWidth * 0.5f + lineWidth * percentage / 100f,
                lineY + scale * 0.004f,
                scale * 0.003f,
                scale * 0.003f,
                paint
            );
        }
    }

    private static int withAlpha(int color, int alpha) {
        return Color.argb(Math.max(0, Math.min(255, alpha)), Color.red(color), Color.green(color), Color.blue(color));
    }

    private static Map<String, int[]> createPalettes() {
        Map<String, int[]> palettes = new HashMap<>();
        palettes.put("liquid-pulse", new int[] { Color.rgb(150, 222, 246), Color.rgb(164, 162, 234) });
        palettes.put("electric-storm", new int[] { Color.rgb(117, 222, 255), Color.rgb(110, 132, 255) });
        palettes.put("plasma-core", new int[] { Color.rgb(255, 175, 100), Color.rgb(255, 104, 145) });
        palettes.put("neon-surge", new int[] { Color.rgb(103, 247, 216), Color.rgb(142, 167, 255) });
        palettes.put("firestorm", new int[] { Color.rgb(255, 184, 81), Color.rgb(255, 104, 47) });
        palettes.put("cosmic-flow", new int[] { Color.rgb(186, 163, 255), Color.rgb(104, 226, 255) });
        palettes.put("saturns-orbit", new int[] { Color.rgb(229, 178, 255), Color.rgb(159, 115, 217) });
        palettes.put("black-hole", new int[] { Color.rgb(219, 185, 255), Color.rgb(116, 114, 255) });
        palettes.put("shooting-stars", new int[] { Color.rgb(130, 216, 255), Color.rgb(255, 220, 156) });
        palettes.put("galaxy-portal", new int[] { Color.rgb(197, 137, 255), Color.rgb(112, 226, 255) });
        palettes.put("sleepy-cat", new int[] { Color.rgb(255, 190, 222), Color.rgb(221, 155, 212) });
        palettes.put("panda-dreams", new int[] { Color.rgb(228, 238, 255), Color.rgb(143, 176, 219) });
        palettes.put("neon-dragon", new int[] { Color.rgb(100, 244, 213), Color.rgb(118, 126, 255) });
        palettes.put("cyber-fox", new int[] { Color.rgb(255, 178, 104), Color.rgb(255, 125, 83) });
        palettes.put("floating-butterflies", new int[] { Color.rgb(218, 157, 255), Color.rgb(116, 226, 255) });
        palettes.put("cyber-hud", new int[] { Color.rgb(105, 238, 255), Color.rgb(150, 154, 255) });
        palettes.put("matrix-rain", new int[] { Color.rgb(113, 255, 153), Color.rgb(34, 205, 112) });
        palettes.put("digital-reactor", new int[] { Color.rgb(113, 236, 255), Color.rgb(111, 198, 255) });
        palettes.put("neon-respawn", new int[] { Color.rgb(255, 112, 217), Color.rgb(129, 232, 255) });
        palettes.put("holographic-core", new int[] { Color.rgb(146, 233, 255), Color.rgb(197, 150, 255) });
        palettes.put("liquid-chrome", new int[] { Color.rgb(210, 237, 255), Color.rgb(140, 179, 221) });
        palettes.put("crystal-bloom", new int[] { Color.rgb(255, 179, 226), Color.rgb(163, 182, 255) });
        palettes.put("golden-particles", new int[] { Color.rgb(255, 218, 143), Color.rgb(238, 171, 76) });
        palettes.put("floating-glass", new int[] { Color.rgb(168, 235, 255), Color.rgb(192, 167, 255) });
        palettes.put("aurora-waves", new int[] { Color.rgb(111, 255, 208), Color.rgb(133, 143, 255) });
        return palettes;
    }
}
