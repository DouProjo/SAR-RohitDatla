---
layout: opencs
title: RPG Market Town
permalink: /gamify/rpg-market
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <!-- GameEnv will create canvas dynamically -->
</div>

<script type="module">
    // ── Liquid tags ONLY work here in the .md file, NOT inside .js files ──
    import Core             from "{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js";
    import GameControl      from "{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/GameControl.js";
    import MarketPirateGame from "{{site.baseurl}}/assets/js/GameEnginev1.1/MarketPirateGame.js";
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const gameLevelClasses = [MarketPirateGame];

    const environment = {
        path:             "{{site.baseurl}}",   // passed into every level as gameEnv.path
        pythonURI:        pythonURI,
        javaURI:          javaURI,
        fetchOptions:     fetchOptions,
        gameContainer:    document.getElementById("gameContainer"),
        gameLevelClasses: gameLevelClasses
    };

    Core.main(environment, GameControl);
</script>