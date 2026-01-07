#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import math

def create_mountain_icon(size):
    """Create a mountain-themed icon for Reels Climber"""
    
    # Create image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background - Sky gradient (blue)
    for y in range(size):
        # Gradient from light blue to dark blue
        r = int(74 + (37 - 74) * (y / size))
        g = int(158 + (99 - 158) * (y / size))
        b = int(255 + (235 - 255) * (y / size))
        draw.rectangle([(0, y), (size, y+1)], fill=(r, g, b, 255))
    
    # Mountains
    mountain_height = int(size * 0.6)
    base_y = size
    
    # Back mountain (darker, smaller)
    back_points = [
        (int(size * 0.2), base_y),
        (int(size * 0.4), size - mountain_height + int(size * 0.2)),
        (int(size * 0.6), base_y)
    ]
    draw.polygon(back_points, fill=(100, 116, 139, 200))
    
    # Main mountain (Everest)
    main_points = [
        (int(size * 0.25), base_y),
        (int(size * 0.5), size - mountain_height),
        (int(size * 0.75), base_y)
    ]
    draw.polygon(main_points, fill=(148, 163, 184, 255))
    
    # Snow cap
    peak_x = int(size * 0.5)
    peak_y = size - mountain_height
    snow_points = [
        (peak_x, peak_y),
        (peak_x - int(size * 0.08), peak_y + int(size * 0.15)),
        (peak_x, peak_y + int(size * 0.12)),
        (peak_x + int(size * 0.08), peak_y + int(size * 0.15))
    ]
    draw.polygon(snow_points, fill=(248, 251, 255, 255))
    
    # Sun/Moon
    sun_x = int(size * 0.75)
    sun_y = int(size * 0.2)
    sun_r = int(size * 0.12)
    draw.ellipse(
        [(sun_x - sun_r, sun_y - sun_r), (sun_x + sun_r, sun_y + sun_r)],
        fill=(255, 215, 0, 200)
    )
    
    # Add a subtle level indicator (circle with star)
    if size >= 48:
        badge_x = int(size * 0.78)
        badge_y = int(size * 0.78)
        badge_r = int(size * 0.14)
        
        # Circle background
        draw.ellipse(
            [(badge_x - badge_r, badge_y - badge_r), 
             (badge_x + badge_r, badge_y + badge_r)],
            fill=(30, 41, 59, 255),
            outline=(255, 215, 0, 255),
            width=max(2, int(size * 0.02))
        )
    
    # Rounded corners
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = int(size * 0.15)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=255)
    
    # Apply mask
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask)
    
    return output

# Generate icons in different sizes
for size, filename in [(16, 'icon16.png'), (48, 'icon48.png'), (128, 'icon128.png')]:
    icon = create_mountain_icon(size)
    icon.save(f'/home/claude/reels-climber-extension/icons/{filename}')
    print(f'Created {filename} ({size}x{size})')

print('All icons created successfully!')
