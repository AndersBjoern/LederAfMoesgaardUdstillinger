/**
 * Moesgaard Application V3 - Main JavaScript
 * Anders Bjørn - Leder af Udstillinger
 */

// Configuration
const CONFIG = {
  animationDuration: 0.8,
  staggerDelay: 0.15,
  easing: "power2.out",
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initHeroAnimations();
  initScrollAnimations();
  initReducedMotion();

  // Refresh ScrollTrigger after a brief delay to ensure layout is settled
  setTimeout(() => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }, 100);

  console.log("Moesgaard Application V3 initialized ✨");
});

/**
 * HERO ANIMATIONS
 */
function initHeroAnimations() {
  // Animate the Moesgaard building in hero
  const building = document.querySelector(".moesgaard-building-hero");
  if (building) {
    // Animate building paths with stagger
    const paths = building.querySelectorAll("path");
    gsap.from(paths, {
      opacity: 0,
      scale: 0.95,
      duration: 2,
      delay: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Add subtle parallax effect on scroll
    gsap.to(building, {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 100,
      opacity: 0.1,
      ease: "none",
    });
  }
}

/**
 * SCROLL ANIMATIONS
 */
function initScrollAnimations() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Hero bridge statement stagger
  // (Removed - no longer in use)

  // E-book section
  animateEbookSection();

  // Timeline section
  animateTimelineSection();

  // Bridge-builder network diagram
  animateBridgeBuilderSection();

  // Resume section
  animateResumeSection();

  // Museum concept beats
  animateMuseumConceptSection();
}

/**
 * Animate E-book Section
 */
function animateEbookSection() {
  const pdfViewer = document.querySelector(".pdf-viewer");
  const ebookContext = document.querySelector(".ebook-context");

  if (pdfViewer) {
    gsap.from(pdfViewer, {
      scrollTrigger: {
        trigger: pdfViewer,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.95,
      duration: CONFIG.animationDuration,
      ease: CONFIG.easing,
    });
  }

  if (ebookContext) {
    const contextElements = ebookContext.querySelectorAll(
      "h3, h4, p, ul, .ebook-message",
    );
    gsap.from(contextElements, {
      scrollTrigger: {
        trigger: ebookContext,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: CONFIG.animationDuration,
      stagger: CONFIG.staggerDelay,
      ease: CONFIG.easing,
    });
  }
}

/**
 * Animate Timeline Section
 */
function animateTimelineSection() {
  const timelineLine = document.querySelector(".timeline-line");
  const chapters = document.querySelectorAll(".timeline-chapter");

  // Animate timeline line drawing
  if (timelineLine && chapters.length > 0) {
    const lastChapter = chapters[chapters.length - 1];
    const lastMarker = lastChapter.querySelector(".marker-dot");
    const timelineContainer = document.querySelector(".timeline-container");

    if (lastMarker && timelineContainer) {
      // Calculate the position where animation should end (at the last marker)
      const markerTop = lastMarker.offsetTop + lastChapter.offsetTop;

      gsap.to(timelineLine, {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 30%",
          end: () => `${markerTop}px 30%`, // End when marker reaches top of viewport
          scrub: 1,
          onUpdate: (self) => {
            // Calculate relative to timeline container
            const markerHeight = lastMarker.offsetHeight;
            const targetHeight = markerTop + markerHeight / 2;
            const currentHeight = targetHeight * self.progress;

            if (self.progress < 0.05) {
              console.log(
                `Timeline: markerTop=${markerTop} targetHeight=${targetHeight}`,
              );
            }

            timelineLine.style.height = `${currentHeight}px`;
          },
        },
      });
    }
  }

  // Animate each chapter
  chapters.forEach((chapter, index) => {
    const chapterContent = chapter.querySelector(".chapter-content");
    const chapterText = chapter.querySelector(".chapter-text");
    const chapterVisual = chapter.querySelector(".chapter-visual");

    // Fade in entire chapter from the side
    gsap.from(chapter, {
      scrollTrigger: {
        trigger: chapter,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      duration: CONFIG.animationDuration,
      ease: CONFIG.easing,
    });

    // Stagger text elements
    if (chapterText) {
      const textElements = chapterText.querySelectorAll(
        "h3, .chapter-subtitle, .chapter-context, .chapter-context p",
      );
      gsap.from(textElements, {
        scrollTrigger: {
          trigger: chapterText,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: CONFIG.animationDuration,
        stagger: 0.1,
        ease: CONFIG.easing,
      });
    }

    // Animate visual placeholder
    if (chapterVisual) {
      gsap.from(chapterVisual, {
        scrollTrigger: {
          trigger: chapterVisual,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        duration: CONFIG.animationDuration,
        ease: "back.out(1.7)",
      });
    }
  });
}

/**
 * Animate Bridge-Builder Section
 */
function animateBridgeBuilderSection() {
  // Animate bento cards with stagger - don't hide initially
  const bentoCards = document.querySelectorAll(".bento-card");

  if (bentoCards.length > 0) {
    gsap.from(bentoCards, {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 30,
      scale: 0.98,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    });
  }
}

/**
 * Animate Resume Section
 */
function animateResumeSection() {
  console.log("📄 Initializing Resume Section Animation");

  const resumeIntro = document.querySelector(".resume-intro");
  const resumeSections = document.querySelectorAll(".resume-section");

  console.log("Found resume sections:", resumeSections.length);

  // Animate intro text
  if (resumeIntro) {
    gsap.from(resumeIntro, {
      scrollTrigger: {
        trigger: resumeIntro,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: CONFIG.animationDuration,
      ease: CONFIG.easing,
    });
  }

  // Animate each resume section
  resumeSections.forEach((section, sectionIndex) => {
    const heading = section.querySelector(".resume-section-heading");
    const entries = section.querySelectorAll(".resume-entry");

    console.log(`Section ${sectionIndex}: Found ${entries.length} entries`);

    // Animate section heading
    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: CONFIG.animationDuration,
        ease: CONFIG.easing,
      });
    }

    // Stagger animate entries
    if (entries.length > 0) {
      console.log(`Animating ${entries.length} entries with x: -30 to x: 0`);

      gsap.fromTo(
        entries,
        {
          opacity: 0,
          x: -30,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
            onEnter: () => {
              console.log(`✅ Animation triggered for section ${sectionIndex}`);
            },
          },
          opacity: 1,
          x: 0,
          duration: CONFIG.animationDuration,
          stagger: 0.15,
          ease: CONFIG.easing,
          clearProps: "transform",
          onStart: () => {
            console.log(`🎬 Animation started for section ${sectionIndex}`);
          },
          onComplete: () => {
            console.log(`✨ Animation completed for section ${sectionIndex}`);
            entries.forEach((entry, i) => {
              const style = window.getComputedStyle(entry);
              console.log(`Entry ${i} transform:`, style.transform);
            });
          },
        },
      );
    }
  });
}

/**
 * Create Footprint Trails Between Containers
 * Calculates center positions and draws footprint emoji trails
 */
function animateMuseumConceptSection() {
  console.log("👣 Creating Footprint Trails");

  // Helper function to get center position of an element
  function getCenter(element) {
    const rect = element.getBoundingClientRect();
    const containerRect = document
      .querySelector(".journey-container")
      .getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    };
  }

  // Helper function to create footprints along a path
  function createFootprintsAlongPath(
    trailElement,
    startCenter,
    endCenter,
    spacing = 80,
    pathType = "default",
  ) {
    // Clear existing footprints
    trailElement.innerHTML = "";

    // Calculate path distance and angle
    const dx = endCenter.x - startCenter.x;
    const dy = endCenter.y - startCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const baseAngle = Math.atan2(dy, dx);

    // Number of footprints based on distance
    const baseFootprints = Math.floor(distance / spacing);

    // Adjust parameters based on path type
    let waveFrequency, waveAmplitude, loopAmplitude;

    if (pathType === "loop") {
      // Trail 1→2: More wavy with stretched curve
      waveFrequency = 5; // Increased for more waves
      waveAmplitude = 50; // Match trail 2→3
      loopAmplitude = 100; // Increased stretch amplitude
    } else if (pathType === "extraWavy") {
      // Trail 2→3: More exaggerated waves
      waveFrequency = 6; // More oscillations
      waveAmplitude = 50; // Larger amplitude
      loopAmplitude = 0;
    } else {
      // Default
      waveFrequency = 4;
      waveAmplitude = 30;
      loopAmplitude = 0;
    }

    const numFootprints = Math.max(3, baseFootprints); // Same calculation for both paths

    // Get trail element's position relative to journey container
    const trailRect = trailElement.getBoundingClientRect();
    const journeyContainer = document.querySelector(".journey-container");
    const containerRect = journeyContainer.getBoundingClientRect();
    const trailOffsetY = trailRect.top - containerRect.top;

    // Create footprints with exaggerated wavy path
    for (let i = 0; i <= numFootprints; i++) {
      const progress = i / numFootprints;

      // Linear interpolation for base position
      const baseX = startCenter.x + dx * progress;
      const baseY = startCenter.y + dy * progress;

      // Calculate wave offset with optional loop
      let waveOffset =
        Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;

      // Add circular loop for trail 1→2 (peaks around progress 0.4-0.6)
      if (loopAmplitude > 0) {
        // Create a stretched curve that peaks towards upper-right
        // Using a smooth sine curve that peaks in the middle
        const curveProgress = Math.sin(progress * Math.PI); // 0 -> 1 -> 0
        const upwardOffset = -curveProgress * loopAmplitude; // Negative = upward
        waveOffset += curveProgress * loopAmplitude * 0.6; // Also stretch right

        const curveX = baseX + Math.cos(baseAngle + Math.PI / 2) * waveOffset;
        const curveY =
          baseY +
          Math.sin(baseAngle + Math.PI / 2) * waveOffset -
          trailOffsetY +
          upwardOffset;

        // Calculate tangent angle for rotation
        const tangentOffset =
          (Math.cos(progress * Math.PI * waveFrequency) *
            waveAmplitude *
            Math.PI *
            waveFrequency) /
          distance;
        const tangentAngle = Math.atan(tangentOffset);
        const finalAngle = baseAngle + tangentAngle + Math.PI / 2;

        const footprint = document.createElement("span");
        footprint.className = "footprint";
        footprint.textContent = "👣";
        footprint.style.left = `${curveX}px`;
        footprint.style.top = `${curveY}px`;
        footprint.style.transform = `translate(-50%, -50%) rotate(${finalAngle}rad)`;
        trailElement.appendChild(footprint);
        continue;
      }

      // Standard wavy path (no loop)
      const curveX = baseX + Math.cos(baseAngle + Math.PI / 2) * waveOffset;
      const curveY =
        baseY + Math.sin(baseAngle + Math.PI / 2) * waveOffset - trailOffsetY;

      // Calculate the tangent angle for proper rotation
      const tangentOffset =
        (Math.cos(progress * Math.PI * waveFrequency) *
          waveAmplitude *
          Math.PI *
          waveFrequency) /
        distance;

      // Combine base angle with tangent angle for natural rotation
      const tangentAngle = Math.atan(tangentOffset);
      const finalAngle = baseAngle + tangentAngle + Math.PI / 2; // +90° for clockwise rotation

      // Create footprint element
      const footprint = document.createElement("span");
      footprint.className = "footprint";
      footprint.textContent = "👣";
      footprint.style.left = `${curveX}px`;
      footprint.style.top = `${curveY}px`;
      footprint.style.transform = `translate(-50%, -50%) rotate(${finalAngle}rad)`;

      trailElement.appendChild(footprint);
    }
  }

  // Wait for page to fully load and layout to settle
  function createTrails() {
    // Get containers
    const container1 = document.getElementById("container-1");
    const artifactKanope = document.getElementById("artifact-kanope");
    const artifactAmulet = document.getElementById("artifact-amulet");
    const artifactPapyrus = document.getElementById("artifact-papyrus");
    const container3 = document.getElementById("container-3");

    // Get trail elements
    const trail1Kanope = document.getElementById("trail-1-kanope");
    const trailKanopeAmulet = document.getElementById("trail-kanope-amulet");
    const trailAmuletPapyrus = document.getElementById("trail-amulet-papyrus");
    const trailPapyrus3 = document.getElementById("trail-papyrus-3");

    console.log("👣 Creating Footprint Trails");

    // Trail 1: Container 1 → Kanopekrukke
    if (container1 && artifactKanope && trail1Kanope) {
      const center1 = getCenter(container1);
      const centerKanope = getCenter(artifactKanope);
      createFootprintsAlongPath(
        trail1Kanope,
        center1,
        centerKanope,
        80,
        "loop",
      );
      console.log(
        `✅ Trail 1→Kanope: ${Math.round(center1.x)},${Math.round(center1.y)} to ${Math.round(centerKanope.x)},${Math.round(centerKanope.y)}`,
      );
    }

    // Trail 2: Kanopekrukke → Amulet
    if (artifactKanope && artifactAmulet && trailKanopeAmulet) {
      const centerKanope = getCenter(artifactKanope);
      const centerAmulet = getCenter(artifactAmulet);
      createFootprintsAlongPath(
        trailKanopeAmulet,
        centerKanope,
        centerAmulet,
        80,
        "extraWavy",
      );
      console.log(
        `✅ Trail Kanope→Amulet: ${Math.round(centerKanope.x)},${Math.round(centerKanope.y)} to ${Math.round(centerAmulet.x)},${Math.round(centerAmulet.y)}`,
      );
    }

    // Trail 3: Amulet → Papyrus
    if (artifactAmulet && artifactPapyrus && trailAmuletPapyrus) {
      const centerAmulet = getCenter(artifactAmulet);
      const centerPapyrus = getCenter(artifactPapyrus);
      createFootprintsAlongPath(
        trailAmuletPapyrus,
        centerAmulet,
        centerPapyrus,
        80,
        "extraWavy",
      );
      console.log(
        `✅ Trail Amulet→Papyrus: ${Math.round(centerAmulet.x)},${Math.round(centerAmulet.y)} to ${Math.round(centerPapyrus.x)},${Math.round(centerPapyrus.y)}`,
      );
    }

    // Trail 4: Papyrus → Container 3
    if (artifactPapyrus && container3 && trailPapyrus3) {
      const centerPapyrus = getCenter(artifactPapyrus);
      const center3 = getCenter(container3);
      createFootprintsAlongPath(
        trailPapyrus3,
        centerPapyrus,
        center3,
        80,
        "extraWavy",
      );
      console.log(
        `✅ Trail Papyrus→3: ${Math.round(centerPapyrus.x)},${Math.round(centerPapyrus.y)} to ${Math.round(center3.x)},${Math.round(center3.y)}`,
      );
    }
  }

  // Create trails after a small delay to ensure layout is complete
  setTimeout(createTrails, 100);

  // Recalculate on window resize (debounced)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createTrails();
      console.log("👣 Footprint trails recalculated on resize");
    }, 250);
  });

  // Animate artifact slots with stagger (bounce + rotation)
  const artifactSlots = document.querySelectorAll(".artifact-slot");
  const artifactDescriptions = document.querySelectorAll(
    ".artifact-description",
  );

  console.log(`📦 Found ${artifactSlots.length} artifact slots`);
  console.log(`📝 Found ${artifactDescriptions.length} artifact descriptions`);

  if (artifactSlots.length > 0) {
    // Animate each artifact row individually as it enters viewport
    artifactSlots.forEach((slot, index) => {
      const artifactRow = slot.closest(".artifact-row");
      const description = artifactRow?.querySelector(".artifact-description");

      // Animate description
      if (description) {
        gsap.from(description, {
          scrollTrigger: {
            trigger: artifactRow,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onEnter: () =>
              console.log(`✨ Artifact ${index + 1} description triggered`),
          },
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Animate slot
      gsap.from(slot, {
        scrollTrigger: {
          trigger: artifactRow,
          start: "top 75%",
          toggleActions: "play none none reverse",
          onEnter: () => console.log(`✨ Artifact ${index + 1} slot triggered`),
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Animate icon with rotation
      const icon = slot.querySelector(".artifact-icon");
      if (icon) {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: artifactRow,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          rotation: -180,
          duration: 0.8,
          delay: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }
    });
  }

  console.log("✅ Footprint Trails & Artifact Animations Initialized");
}
/**
 * REDUCED MOTION SUPPORT
 */
function initReducedMotion() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // Disable GSAP animations
    gsap.globalTimeline.pause();

    // Show all content immediately
    document
      .querySelectorAll(".concept-beat, .timeline-chapter")
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });

    // Stop background animations
    document.querySelectorAll(".gradient-orb").forEach((orb) => {
      orb.style.animation = "none";
    });

    console.log("Reduced motion enabled - animations disabled");
  }
}

/**
 * SMOOTH SCROLLING FOR NAVIGATION
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Don't prevent default for non-anchor links (like download links)
    if (href === "#" || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/**
 * LAZY LOAD PDF ON MOBILE
 */
if (window.innerWidth < 768) {
  const pdfIframe = document.querySelector(".pdf-embed iframe");
  if (pdfIframe) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // PDF is visible, ensure it's loaded
          if (!pdfIframe.src || pdfIframe.src === "") {
            pdfIframe.src = pdfIframe.getAttribute("data-src") || pdfIframe.src;
          }
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(pdfIframe);
  }
}

/**
 * PARALLAX EFFECTS FOR BACKGROUND ELEMENTS
 */
function initParallaxEffects() {
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    gsap.to(orb, {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: index % 2 === 0 ? 150 : -150,
      opacity: 0.3,
      ease: "none",
    });
  });
}

// Initialize parallax after a short delay
setTimeout(initParallaxEffects, 500);

/**
 * CONSOLE BRANDING
 */
console.log(
  "%c Moesgaard Application V3 ",
  "background: #2d6a6a; color: #f5f5f0; font-size: 16px; padding: 10px; font-weight: bold;",
);
console.log(
  "%c Anders Bjørn - Leder af Moesgaard Udstillinger ",
  "color: #8b6f47; font-size: 12px;",
);

/**
 * STICKY HEADERS - GSAP ScrollTrigger Implementation
 */
function initStickyHeaders() {
  const headersWrapper = document.querySelector(".journey-headers-wrapper");
  const journeySection = document.querySelector(".journey-section-wrapper");

  if (!headersWrapper || !journeySection) {
    console.log("❌ Sticky headers: Elements not found");
    return;
  }

  // Clone the headers to create a fixed version
  const stickyClone = headersWrapper.cloneNode(true);
  stickyClone.classList.add("sticky-clone");
  stickyClone.style.position = "fixed";
  stickyClone.style.top = "0";
  stickyClone.style.left = "50%";
  stickyClone.style.transform = "translateX(-50%)";
  stickyClone.style.width = "100%";
  stickyClone.style.maxWidth = "1200px";
  stickyClone.style.opacity = "0";
  stickyClone.style.pointerEvents = "none";
  stickyClone.style.zIndex = "100";
  document.body.appendChild(stickyClone);

  // Use GSAP ScrollTrigger to show/hide the sticky clone
  gsap.timeline({
    scrollTrigger: {
      trigger: journeySection,
      start: "top top", // When section reaches top of viewport
      end: "bottom 50%", // When section bottom reaches top of viewport
      onEnter: () => {
        gsap.to(stickyClone, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        console.log("📌 Headers are now sticky");
      },
      onLeave: () => {
        gsap.to(stickyClone, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        console.log("📍 Headers unstuck (section ended)");
      },
      onEnterBack: () => {
        gsap.to(stickyClone, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        console.log("📌 Headers sticky again");
      },
      onLeaveBack: () => {
        gsap.to(stickyClone, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        console.log("📍 Headers unstuck (scrolled back up)");
      },
    },
  });

  console.log("✅ Sticky headers with GSAP ScrollTrigger initialized");
}

// Initialize sticky headers
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initStickyHeaders, 300); // Small delay to ensure GSAP is ready
});
