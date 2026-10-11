import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_vector_check(draw, center_x, center_y, size=10, color=(52, 211, 153), width=2):
    p1 = (center_x - size // 2, center_y)
    p2 = (center_x - size // 6, center_y + size // 3)
    p3 = (center_x + size // 2, center_y - size // 3)
    draw.line([p1, p2], fill=color, width=width)
    draw.line([p2, p3], fill=color, width=width)

def draw_vector_bolt(draw, center_x, center_y, size=14, color=(244, 114, 182)):
    pts = [
        (center_x + 1, center_y - size // 2),
        (center_x - size // 3, center_y),
        (center_x, center_y),
        (center_x - 1, center_y + size // 2),
        (center_x + size // 3, center_y),
        (center_x, center_y)
    ]
    draw.polygon(pts, fill=color)

def add_glow_and_shadow(base_img, widget_img, pos, shadow_blur=28, glow_color=(217, 70, 239, 45)):
    w, h = widget_img.size
    pad = shadow_blur * 2 + 30
    effect_w = w + pad * 2
    effect_h = h + pad * 2
    effect_layer = Image.new('RGBA', (effect_w, effect_h), (0, 0, 0, 0))
    eff_draw = ImageDraw.Draw(effect_layer)
    
    # Ambient soft glow
    eff_draw.rounded_rectangle(
        [(pad - 6, pad - 6), (pad + w + 6, pad + h + 6)],
        radius=20,
        fill=glow_color
    )
    
    # Deep drop shadow
    eff_draw.rounded_rectangle(
        [(pad, pad + 12), (pad + w, pad + h + 12)],
        radius=16,
        fill=(0, 0, 0, 180)
    )
    
    effect_layer = effect_layer.filter(ImageFilter.GaussianBlur(shadow_blur))
    base_img.paste(effect_layer, (pos[0] - pad, pos[1] - pad), mask=effect_layer)
    base_img.paste(widget_img, pos, mask=widget_img)

def create_gradient_background(width, height, top_color=(15, 23, 42), bottom_color=(3, 6, 15)):
    base = Image.new('RGBA', (width, height), top_color)
    draw = ImageDraw.Draw(base)
    for y in range(height):
        factor = y / height
        r = int(top_color[0] + (bottom_color[0] - top_color[0]) * factor)
        g = int(top_color[1] + (bottom_color[1] - top_color[1]) * factor)
        b = int(top_color[2] + (bottom_color[2] - top_color[2]) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    return base

def add_radial_light(base_img, center, radius, color=(217, 70, 239, 30)):
    w, h = base_img.size
    light = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(light)
    x0 = center[0] - radius
    y0 = center[1] - radius
    x1 = center[0] + radius
    y1 = center[1] + radius
    draw.ellipse([(x0, y0), (x1, y1)], fill=color)
    light = light.filter(ImageFilter.GaussianBlur(radius // 2))
    base_img.alpha_composite(light)

def generate_assets(screenshot_path, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    raw_widget = Image.open(screenshot_path).convert('RGBA')

    font_bold_path = r'C:\Windows\Fonts\segoeuib.ttf'
    font_reg_path = r'C:\Windows\Fonts\segoeui.ttf'
    
    # ==========================================================
    # 1. SCREENSHOT 1280x800 (Store Screenshot)
    # ==========================================================
    sw, sh = 1280, 800
    img1 = create_gradient_background(sw, sh, (15, 23, 42), (4, 6, 15))
    add_radial_light(img1, (930, 400), 380, (217, 70, 239, 45))
    add_radial_light(img1, (280, 250), 320, (99, 102, 241, 28))

    draw1 = ImageDraw.Draw(img1)
    
    # Badge: CHROME EXTENSION (Dark sleek pill with vibrant border)
    badge_font = ImageFont.truetype(font_bold_path, 13)
    bx, by = 110, 150
    bw, bh = 190, 34
    draw1.rounded_rectangle([(bx, by), (bx + bw, by + bh)], radius=17, fill=(28, 20, 38), outline=(217, 70, 239), width=1)
    draw_vector_bolt(draw1, bx + 22, by + 17, size=14, color=(244, 114, 182))
    draw1.text((bx + 36, by + 8), "CHROME EXTENSION", fill=(244, 114, 182), font=badge_font)

    # Title & Subtitle
    title_font = ImageFont.truetype(font_bold_path, 54)
    draw1.text((110, 204), "ZapWebp", fill=(255, 255, 255), font=title_font)

    sub_font = ImageFont.truetype(font_bold_path, 25)
    draw1.text((110, 274), "Fast WebP to PNG/JPG Converter", fill=(226, 232, 240), font=sub_font)

    desc_font = ImageFont.truetype(font_reg_path, 18)
    draw1.text((110, 318), "Save web images with a simple right-click.\n100% in-browser, ultra-fast and private.", fill=(148, 163, 184), font=desc_font)

    # Features
    features = [
        "Right-click direct download (PNG or JPG)",
        "Zero server upload • 100% client-side privacy",
        "Preserves transparency or clean white fill",
        "No signup, no limits, offline compatible"
    ]
    feat_font = ImageFont.truetype(font_bold_path, 16)
    
    fy = 415
    for feat in features:
        draw1.ellipse([(110, fy + 2), (132, fy + 24)], fill=(12, 32, 24), outline=(16, 185, 129), width=1)
        draw_vector_check(draw1, 121, fy + 13, size=10, color=(52, 211, 153), width=2)
        draw1.text((144, fy + 3), feat, fill=(241, 245, 249), font=feat_font)
        fy += 45

    pill_font = ImageFont.truetype(font_reg_path, 14)
    draw1.text((110, 635), "Compatible with Chrome, Brave, Edge & Opera", fill=(100, 116, 139), font=pill_font)

    # Widget placement
    scale1 = 1.35
    w1 = int(raw_widget.width * scale1)
    h1 = int(raw_widget.height * scale1)
    widget_scaled1 = raw_widget.resize((w1, h1), Image.Resampling.LANCZOS)
    pos1 = (770, (sh - h1) // 2)
    add_glow_and_shadow(img1, widget_scaled1, pos1, shadow_blur=28, glow_color=(217, 70, 239, 45))

    img1.convert('RGB').save(os.path.join(output_dir, 'screenshot-1280x800.png'), quality=96)
    print("Regenerated screenshot-1280x800.png")

    # ==========================================================
    # 2. PROMO TILE 440x280 (Small Promo Tile)
    # ==========================================================
    pw, ph = 440, 280
    img2 = create_gradient_background(pw, ph, (15, 23, 42), (4, 6, 15))
    add_radial_light(img2, (330, 140), 160, (217, 70, 239, 50))
    draw2 = ImageDraw.Draw(img2)

    t2_font = ImageFont.truetype(font_bold_path, 28)
    draw2.text((26, 40), "ZapWebp", fill=(255, 255, 255), font=t2_font)

    sub2_font = ImageFont.truetype(font_bold_path, 15)
    draw2.text((26, 78), "Fast WebP Converter", fill=(244, 114, 182), font=sub2_font)

    desc2_font = ImageFont.truetype(font_reg_path, 13)
    draw2.text((26, 106), "Right-click to save\nas PNG or JPG.", fill=(148, 163, 184), font=desc2_font)

    # Sleek dark badges with high contrast
    mb_font = ImageFont.truetype(font_bold_path, 11)
    # Badge 1: 100% PRIVATE
    draw2.rounded_rectangle([(26, 164), (145, 192)], radius=14, fill=(10, 28, 22), outline=(16, 185, 129), width=1)
    draw_vector_check(draw2, 38, 178, size=8, color=(52, 211, 153), width=2)
    draw2.text((48, 171), "100% PRIVATE", fill=(52, 211, 153), font=mb_font)

    # Badge 2: 1-CLICK SAVE
    draw2.rounded_rectangle([(26, 202), (145, 230)], radius=14, fill=(28, 18, 36), outline=(217, 70, 239), width=1)
    draw_vector_bolt(draw2, 38, 216, size=10, color=(244, 114, 182))
    draw2.text((48, 209), "1-CLICK SAVE", fill=(244, 114, 182), font=mb_font)

    scale2 = 0.58
    w2 = int(raw_widget.width * scale2)
    h2 = int(raw_widget.height * scale2)
    widget_scaled2 = raw_widget.resize((w2, h2), Image.Resampling.LANCZOS)
    pos2 = (226, (ph - h2) // 2)
    add_glow_and_shadow(img2, widget_scaled2, pos2, shadow_blur=16, glow_color=(217, 70, 239, 45))

    img2.convert('RGB').save(os.path.join(output_dir, 'promo-tile-440x280.png'), quality=96)
    print("Regenerated promo-tile-440x280.png")

    # ==========================================================
    # 3. MARQUEE BANNER 1400x560 (Large Promo Banner)
    # ==========================================================
    mw, mh = 1400, 560
    img3 = create_gradient_background(mw, mh, (15, 23, 42), (4, 6, 15))
    add_radial_light(img3, (1050, 280), 350, (217, 70, 239, 50))
    add_radial_light(img3, (300, 180), 280, (99, 102, 241, 30))
    draw3 = ImageDraw.Draw(img3)

    m_badge_font = ImageFont.truetype(font_bold_path, 13)
    draw3.rounded_rectangle([(120, 92), (315, 126)], radius=17, fill=(28, 20, 38), outline=(217, 70, 239), width=1)
    draw_vector_bolt(draw3, 136, 109, size=14, color=(244, 114, 182))
    draw3.text((150, 100), "CHROME EXTENSION", fill=(244, 114, 182), font=m_badge_font)

    m_title_font = ImageFont.truetype(font_bold_path, 52)
    draw3.text((120, 145), "ZapWebp", fill=(255, 255, 255), font=m_title_font)

    m_sub_font = ImageFont.truetype(font_bold_path, 26)
    draw3.text((120, 215), "Instant WebP to PNG/JPG Converter", fill=(226, 232, 240), font=m_sub_font)

    m_desc_font = ImageFont.truetype(font_reg_path, 19)
    draw3.text((120, 260), "Convert any image with a right-click.\n100% in-browser, private, and lightning fast.", fill=(148, 163, 184), font=m_desc_font)

    # Badges (Dark sleek backgrounds with crisp colored outlines)
    pills = [
        ("100% In-Browser", (10, 28, 22), (16, 185, 129), (52, 211, 153), "check"),
        ("Right-Click Save", (28, 18, 36), (217, 70, 239), (244, 114, 182), "bolt"),
        ("Preserves Alpha", (16, 20, 38), (99, 102, 241), (165, 180, 252), "dot")
    ]
    px = 120
    for ptext, pfill, poutline, pcolor, icon_type in pills:
        pw_box = 180 if "Alpha" in ptext else (190 if "Right" in ptext else 175)
        draw3.rounded_rectangle([(px, 350), (px + pw_box, 390)], radius=20, fill=pfill, outline=poutline, width=1)
        if icon_type == "check":
            draw_vector_check(draw3, px + 22, 370, size=9, color=pcolor, width=2)
            draw3.text((px + 36, 360), ptext, fill=pcolor, font=ImageFont.truetype(font_bold_path, 15))
        elif icon_type == "bolt":
            draw_vector_bolt(draw3, px + 22, 370, size=12, color=pcolor)
            draw3.text((px + 34, 360), ptext, fill=pcolor, font=ImageFont.truetype(font_bold_path, 15))
        else:
            draw3.ellipse([(px + 18, 366), (px + 26, 374)], fill=pcolor)
            draw3.text((px + 36, 360), ptext, fill=pcolor, font=ImageFont.truetype(font_bold_path, 15))
        px += pw_box + 16

    scale3 = 1.15
    w3 = int(raw_widget.width * scale3)
    h3 = int(raw_widget.height * scale3)
    widget_scaled3 = raw_widget.resize((w3, h3), Image.Resampling.LANCZOS)
    pos3 = (900, (mh - h3) // 2)
    add_glow_and_shadow(img3, widget_scaled3, pos3, shadow_blur=26, glow_color=(217, 70, 239, 45))

    img3.convert('RGB').save(os.path.join(output_dir, 'marquee-1400x560.png'), quality=96)
    print("Regenerated marquee-1400x560.png")

if __name__ == '__main__':
    screenshot = r"C:\Users\loren\Pictures\Screenshots\Screenshot 2026-10-11 213926.png"
    out_dir = r"E:\Dev\projects\webp-converter-tool\extension\store-assets"
    generate_assets(screenshot, out_dir)
