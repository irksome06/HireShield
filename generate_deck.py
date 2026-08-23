import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Cyber Colors
    COLOR_BG = RGBColor(7, 11, 22)         # Deep cyber slate #070B16
    COLOR_CARD = RGBColor(14, 21, 38)      # Card background #0E1526
    COLOR_BORDER = RGBColor(30, 58, 110)   # Border #1E3A6E
    COLOR_CYAN = RGBColor(6, 182, 212)     # Cyan #06B6D4
    COLOR_EMERALD = RGBColor(16, 185, 129) # Emerald #10B981
    COLOR_ROSE = RGBColor(244, 63, 94)     # Rose #F43F5E
    COLOR_WHITE = RGBColor(255, 255, 255)
    COLOR_MUTED = RGBColor(148, 163, 184)  # Slate 400

    def add_header(slide, tag_text, title_text, subtitle_text=""):
        # Background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_BG
        bg.line.fill.background()

        # Tag
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(0.4))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_CYAN
        p_tag.font.name = "Arial"

        # Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.8))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(26)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_WHITE
        p_title.font.name = "Arial"

        # Subtitle
        if subtitle_text:
            p_sub = tf_title.add_paragraph()
            p_sub.text = subtitle_text
            p_sub.font.size = Pt(13)
            p_sub.font.color.rgb = COLOR_MUTED
            p_sub.font.name = "Arial"

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Hero)
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_BG
    bg1.line.fill.background()

    # Title Card
    tb = slide1.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.333), Inches(3.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "🛡️ HIRESHIELD"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_CYAN
    p0.font.name = "Arial"
    p0.alignment = PP_ALIGN.CENTER

    p1 = tf.add_paragraph()
    p1.text = "Zero-Trust Recruitment Defense & Job Scam Intelligence"
    p1.font.size = Pt(22)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_WHITE
    p1.font.name = "Arial"
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "\nDeterministic Risk Scoring • Multi-Modal OCR • Real-Time DNS/MX Telemetry • Cryptographic Job Passports"
    p2.font.size = Pt(14)
    p2.font.color.rgb = COLOR_MUTED
    p2.font.name = "Arial"
    p2.alignment = PP_ALIGN.CENTER

    p3 = tf.add_paragraph()
    p3.text = "\nLive Demo: https://hireshield-ro6i.onrender.com"
    p3.font.size = Pt(13)
    p3.font.color.rgb = COLOR_EMERALD
    p3.font.bold = True
    p3.font.name = "Arial"
    p3.alignment = PP_ALIGN.CENTER

    # -------------------------------------------------------------
    # SLIDE 2: The Problem
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "The Threat Landscape", "The $3.8B Recruitment Fraud Epidemic", "Job seekers and students face sophisticated, organized cyber fraud.")

    cards2 = [
        ("💸 Advance-Fee Equipment Scams", "Scammers send fake $3,000+ PDF checks, instructing victims to wire back $400 via Zelle/Wire to a fake vendor.", COLOR_ROSE),
        ("🌐 Typo-Squatted Domains", "Attackers register disposable .top / .xyz domains (e.g. stripe-careers.top) to mimic verified Fortune 500 portals.", COLOR_ROSE),
        ("💬 Telegram & Anonymity Traps", "Recruiters deflect candidates to unmonitored Telegram/WhatsApp handles to evade enterprise audit logs.", COLOR_ROSE)
    ]
    for i, (title, desc, color) in enumerate(cards2):
        left = Inches(0.8 + i * 3.9)
        top = Inches(2.2)
        card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.7), Inches(4.3))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        ctb = slide2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.3), Inches(3.3), Inches(3.7))
        ctf = ctb.text_frame
        ctf.word_wrap = True
        cp0 = ctf.paragraphs[0]
        cp0.text = title
        cp0.font.size = Pt(16)
        cp0.font.bold = True
        cp0.font.color.rgb = color
        cp0.font.name = "Arial"

        cp1 = ctf.add_paragraph()
        cp1.text = f"\n{desc}"
        cp1.font.size = Pt(13)
        cp1.font.color.rgb = COLOR_MUTED
        cp1.font.name = "Arial"

    # -------------------------------------------------------------
    # SLIDE 3: The Solution (HireShield Architecture)
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "System Architecture", "The HireShield 5-Stage Multi-Vector Pipeline", "Deterministic verification replacing black-box AI guesswork.")

    steps = [
        ("1. Multi-Modal Ingestion", "Text, URLs, Offer Letter PDFs & Screenshots (Pytesseract OCR + Gemini Vision)."),
        ("2. Dual-Engine Extraction", "Google Gemini 1.5 JSON Schema extraction with zero-crash regex fallback."),
        ("3. Deep DNS/MX Forensics", "Real-time DNS MX server checks, domain mismatch validation & TLD abuse analysis."),
        ("4. Deterministic Risk Engine", "Explainable 0-100 mathematical deduction ledger (-40, -25, -20, -15 penalties)."),
        ("5. Job Trust Passport™", "Cryptographically notarized digital passport with SHA-256 hash & PDF export.")
    ]
    for i, (step_title, step_desc) in enumerate(steps):
        top = Inches(2.0 + i * 0.95)
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.7), Inches(0.8))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        stb = slide3.shapes.add_textbox(Inches(1.0), top + Inches(0.12), Inches(11.3), Inches(0.6))
        stf = stb.text_frame
        stf.word_wrap = True
        sp0 = stf.paragraphs[0]
        sp0.text = f"{step_title}: "
        sp0.font.bold = True
        sp0.font.size = Pt(14)
        sp0.font.color.rgb = COLOR_CYAN
        sp0.font.name = "Arial"

        run = sp0.add_run()
        run.text = step_desc
        run.font.bold = False
        run.font.size = Pt(13)
        run.font.color.rgb = COLOR_WHITE

    # -------------------------------------------------------------
    # SLIDE 4: Deterministic Scoring vs Black-Box AI
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "Core Innovation", "Why Deterministic Scoring Wins Over Black-Box AI", "Mathematical transparency builds candidate trust.")

    # Left Column: Black Box AI
    left_card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.6), Inches(4.5))
    left_card.fill.solid()
    left_card.fill.fore_color.rgb = COLOR_CARD
    left_card.line.color.rgb = COLOR_ROSE

    ltb = slide4.shapes.add_textbox(Inches(1.1), Inches(2.4), Inches(5.0), Inches(4.0))
    ltf = ltb.text_frame
    ltf.word_wrap = True
    lp0 = ltf.paragraphs[0]
    lp0.text = "❌ Typical Black-Box LLM Approach"
    lp0.font.size = Pt(18)
    lp0.font.bold = True
    lp0.font.color.rgb = COLOR_ROSE

    lp1 = ltf.add_paragraph()
    lp1.text = "\n• Vague warnings: 'This email feels suspicious.'\n• Hallucinations & inconsistent scores.\n• No verifiable network or domain evidence.\n• Fails when API quotas or internet drops."
    lp1.font.size = Pt(13)
    lp1.font.color.rgb = COLOR_MUTED

    # Right Column: HireShield Deterministic
    right_card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = COLOR_CARD
    right_card.line.color.rgb = COLOR_EMERALD

    rtb = slide4.shapes.add_textbox(Inches(7.1), Inches(2.4), Inches(5.1), Inches(4.0))
    rtf = rtb.text_frame
    rtf.word_wrap = True
    rp0 = rtf.paragraphs[0]
    rp0.text = "✅ HireShield Zero-Trust Engine"
    rp0.font.size = Pt(18)
    rp0.font.bold = True
    rp0.font.color.rgb = COLOR_EMERALD

    rp1 = rtf.add_paragraph()
    rp1.text = "\n• Base 100 PTS with explicit mathematical deductions:\n  - -40 PTS: Advance Equipment Check Demand\n  - -25 PTS: High-Risk .top/.xyz Domain\n  - -20 PTS: Recruiter MX vs Corporate Mismatch\n• Live DNS MX server handshake proof.\n• Offline-resilient regex fallback architecture."
    rp1.font.size = Pt(13)
    rp1.font.color.rgb = COLOR_WHITE

    # -------------------------------------------------------------
    # SLIDE 5: Key Live Features & UX
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "Product Capabilities", "Comprehensive Feature Suite & User Experience", "Built for intuitive candidate safety across web and mobile.")

    feat_cards = [
        ("🖥️ 3D Interactive Terminal", "CSS 3D perspective matrix with clamshell hinge and gyro cursor tracking."),
        ("📸 Multi-Modal OCR Scanner", "Drop screenshots of offer letters/emails for instant text and entity extraction."),
        ("🏢 Verified Enterprise Directory", "Search pre-verified companies (Stripe, Google, Razorpay) with active MX domains."),
        ("📜 Job Trust Passport™", "Export tamper-proof PDF credentials signed with cryptographic SHA-256 hashes.")
    ]
    for i, (title, desc) in enumerate(feat_cards):
        row = i // 2
        col = i % 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(2.2 + row * 2.3)
        
        card = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.7), Inches(2.0))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        ftb = slide5.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.3), Inches(1.6))
        ftf = ftb.text_frame
        ftf.word_wrap = True
        fp0 = ftf.paragraphs[0]
        fp0.text = title
        fp0.font.size = Pt(16)
        fp0.font.bold = True
        fp0.font.color.rgb = COLOR_CYAN

        fp1 = ftf.add_paragraph()
        fp1.text = f"\n{desc}"
        fp1.font.size = Pt(13)
        fp1.font.color.rgb = COLOR_WHITE

    # -------------------------------------------------------------
    # SLIDE 6: Market Opportunity & Scalability
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "Market & Growth", "Business Model & Expansion Strategy", "Scalable multi-channel defense platform.")

    biz_items = [
        ("B2C Pro Subscriptions", "Free quick scans for job seekers; Pro tier with unlimited batch OCR & Chrome extension alerts."),
        ("B2B Job Board Verification API", "API integration with LinkedIn, Unstop, and Internshala to pre-verify job postings with Trust Passports."),
        ("Enterprise Brand Defense", "Brand protection suite for Fortune 500 enterprises to monitor and takedown spoofed recruiter domains.")
    ]
    for i, (title, desc) in enumerate(biz_items):
        left = Inches(0.8 + i * 3.9)
        top = Inches(2.2)
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.7), Inches(4.3))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        btb = slide6.shapes.add_textbox(left + Inches(0.2), top + Inches(0.3), Inches(3.3), Inches(3.7))
        btf = btb.text_frame
        btf.word_wrap = True
        bp0 = btf.paragraphs[0]
        bp0.text = title
        bp0.font.size = Pt(16)
        bp0.font.bold = True
        bp0.font.color.rgb = COLOR_CYAN

        bp1 = btf.add_paragraph()
        bp1.text = f"\n{desc}"
        bp1.font.size = Pt(13)
        bp1.font.color.rgb = COLOR_MUTED

    # -------------------------------------------------------------
    # SLIDE 7: Conclusion & Live Demo
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    bg7 = slide7.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg7.fill.solid()
    bg7.fill.fore_color.rgb = COLOR_BG
    bg7.line.fill.background()

    tb7 = slide7.shapes.add_textbox(Inches(1.5), Inches(1.5), Inches(10.333), Inches(4.5))
    tf7 = tb7.text_frame
    tf7.word_wrap = True

    p0 = tf7.paragraphs[0]
    p0.text = "Thank You! Try HireShield Live"
    p0.font.size = Pt(36)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_WHITE
    p0.alignment = PP_ALIGN.CENTER

    p1 = tf7.add_paragraph()
    p1.text = "\nProtecting the Future of Work with Explainable Cyber Defense"
    p1.font.size = Pt(18)
    p1.font.color.rgb = COLOR_CYAN
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf7.add_paragraph()
    p2.text = "\n🌐 Live Web Application: https://hireshield-ro6i.onrender.com"
    p2.font.size = Pt(16)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_EMERALD
    p2.alignment = PP_ALIGN.CENTER

    p3 = tf7.add_paragraph()
    p3.text = "📦 GitHub Repository: https://github.com/irksome06/HireShield"
    p3.font.size = Pt(14)
    p3.font.color.rgb = COLOR_MUTED
    p3.alignment = PP_ALIGN.CENTER

    # Save
    out_path = os.path.join(os.path.dirname(__file__), "HIRESHIELD_PRESENTATION.pptx")
    prs.save(out_path)
    print(f"Presentation saved to: {out_path}")

if __name__ == "__main__":
    create_presentation()
