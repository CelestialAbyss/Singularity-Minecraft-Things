// modid shortcuts
let FIN = (id) => `finality:${id}`
let EXT = (id) => `extendedcrafting:${id}`
let C = (id) => `create:${id}`

// concrete colors

// crafting method shortcuts probably not going to use this
// let mechanical = createMechanicalCrafting;
// let pressing = createPressing
// let compacting = createCompacting
// let filling = createFilling
// let mixing = createMixing

onEvent('recipes', event => {
    event.remove({id: 'minecraft:beacon'})
    event.remove({id: 'tconstruct:common/glass/vanilla/beacon'})
    event.remove({id: 'minecraft:end_crystal'})
    event.remove({id: 'unusualend:end_crystal'})
    event.remove({id: 'unusualend:end_crystal_via_chiseled_glass'})
    event.remove({id: 'tconstruct:common/glass/vanilla/end_crystal'})
    event.remove({id: 'extendedcrafting:black_iron_ingot'})
    event.remove({id: 'extendedcrafting:handheld_table'})
    event.shaped('extendedcrafting:handheld_table', [
        ' C',
        'S '
    ], {
        C: '#forge:workbenches',
        S: '#forge:rods/wooden'
    }).id('finality:handheld_crafting_table_compat')
    event.shapeless('extendedcrafting:black_iron_ingot', ['minecraft:iron_ingot', 'minecraft:black_dye', 'create:powdered_obsidian']).id('finality:ext_black_iron_ingot')
    event.shaped('minecraft:beacon',[
        'GGG',
        'GSG',
        'OOO'
    ], {
        G: '#forge:glass/colorless',
        S: 'extendedcrafting:ender_star',
        O: 'minecraft:obsidian'
    }).id('finality:beacon')
    event.recipes.createMechanicalCrafting(Item.of('4x extendedcrafting:crystaltine_ingot'), [
        'DLLLLLD',
        'DGISIGD',
        'DGISIGD',
        'DLLLLLD'
    ], {
        L: 'minecraft:lapis_lazuli',
        D: 'minecraft:diamond',
        I: 'minecraft:iron_ingot',
        S: 'minecraft:nether_star',
        G: 'minecraft:gold_ingot'
    }).id('finality:crystaltine_mechanical_translate')
    event.recipes.createCrushing(['extendedcrafting:the_ultimate_nugget', Item.of('extendedcrafting:the_ultimate_nugget').withChance(0.25)], 'extendedcrafting:ultimate_singularity').processingTime(1200).id('finality:the_ultimate_nugget')
    event.recipes.createMechanicalCrafting('create:handheld_worldshaper', [
        'CPUSSS',
        'II    '
    ], {
        C: 'extendedcrafting:the_ultimate_catalyst',
        S: 'create:sturdy_sheet',
        U: 'extendedcrafting:ultimate_singularity',
        P: 'create:precision_mechanism',
        I: 'extendedcrafting:the_ultimate_ingot'
    }).id('finality:create_worldshaper')
    // modified vanilla recipes 
    event.custom({
        type: 'extendedcrafting:combination',
        powerCost: 100000,
        input: {
            item: 'minecraft:ender_eye'
        },
        ingredients: [
            Ingredient.of('#forge:glass/colorless').toJson(),
            Ingredient.of('#forge:glass/colorless').toJson(),
            Ingredient.of('#forge:glass/colorless').toJson(),
            Ingredient.of('#forge:glass/colorless').toJson(),
            Ingredient.of('minecraft:ghast_tear').toJson(),
            Ingredient.of('extendedcrafting:ender_star').toJson(),
            Ingredient.of('mysticalagriculture:prosperity_shard').toJson(),
            Ingredient.of('minecraft:fermented_spider_eye').toJson(),
        ],
        result: {
            item: 'minecraft:end_crystal'
        }
    }).id('finality:end_crystal')
    // ender crafting
    event.remove({id: 'extendedcrafting:ender_crafter'})
    event.shaped('extendedcrafting:ender_crafter', [
        'EEE',
        'ICI',
        'III'
    ], {
        E: 'minecraft:ender_eye',
        I: 'extendedcrafting:ender_ingot',
        C: 'extendedcrafting:crafting_core'
    }).id('finality:extended/ender_crafter')
    // singularity creation step 1
    event.recipes.createMechanicalCrafting('finality:dormant_singularity_core', [
        ' OOOOO ',
        'OOOOOOO',
        'OOOOOOO',
        'OOOEOOO',
        'OOOOOOO',
        'OOOOOOO',
        ' OOOOO '
    ], {
        E: 'minecraft:crying_obsidian',
        O: 'minecraft:obsidian'
    }).id('finality:dormant_singularity_core')
    // singularity step 2
    event.recipes.createCompacting([Fluid.of('finality:condensed_universal_entropy', 1000)], ['9x minecraft:crying_obsidian']).id('finality:condensing_universe_essence')
    // singularity step 3 (new method)
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:andesite_alloy"}')
    ], 'finality:dormant_singularity_core', [
        event.recipes.createFilling([FIN('incomplete_andesite_alloy_singularity')], [FIN('incomplete_andesite_alloy_singularity'), Fluid.of('finality:condensed_universal_entropy', 250)]),
        event.recipes.createDeploying([FIN('incomplete_andesite_alloy_singularity')], [FIN('incomplete_andesite_alloy_singularity'), 'create:andesite_alloy_block']),
        event.recipes.createPressing([FIN('incomplete_andesite_alloy_singularity')], [FIN('incomplete_andesite_alloy_singularity')]),
        event.recipes.createDeploying([FIN('incomplete_andesite_alloy_singularity')], [FIN('incomplete_andesite_alloy_singularity'), 'create:andesite_alloy_block']),
        event.recipes.createPressing([FIN('incomplete_andesite_alloy_singularity')], [FIN('incomplete_andesite_alloy_singularity')])
    ]).transitionalItem(FIN('incomplete_andesite_singularity')).loops(64).id('finality:andesite_alloy_singularity')
    // sequenced assembly singularities
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:blue_ice"}')
    ],'minecraft:blue_ice',[
        event.recipes.createFilling([FIN('incomplete_blue_ice_singularity')], [FIN('incomplete_blue_ice_singularity'), Fluid.of('minecraft:water', 25)]),
        event.recipes.createDeploying([FIN('incomplete_blue_ice_singularity')], [FIN('incomplete_blue_ice_singularity'),'minecraft:blue_ice']),
        event.recipes.createPressing([FIN('incomplete_blue_ice_singularity')], [FIN('incomplete_blue_ice_singularity')]),
        event.recipes.createPressing([FIN('incomplete_blue_ice_singularity')], [FIN('incomplete_blue_ice_singularity')]),
        event.recipes.createPressing([FIN('incomplete_blue_ice_singularity')], [FIN('incomplete_blue_ice_singularity')])
    ]).transitionalItem(FIN('incomplete_blue_ice_singularity')).loops(16).id('finality:blue_ice_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:coarse_dirt"}')
    ],'minecraft:coarse_dirt',[
        event.recipes.createFilling(FIN('incomplete_coarse_dirt_singularity'), [FIN('incomplete_coarse_dirt_singularity'), Fluid.of('minecraft:water', 25)]),
        event.recipes.createDeploying(FIN('incomplete_coarse_dirt_singularity'), [FIN('incomplete_coarse_dirt_singularity'),'minecraft:dirt']),
        event.recipes.createDeploying(FIN('incomplete_coarse_dirt_singularity'), [FIN('incomplete_coarse_dirt_singularity'),'minecraft:gravel']),
        event.recipes.createPressing(FIN('incomplete_coarse_dirt_singularity'), FIN('incomplete_coarse_dirt_singularity')),
        event.recipes.createPressing(FIN('incomplete_coarse_dirt_singularity'), FIN('incomplete_coarse_dirt_singularity')),
        event.recipes.createPressing(FIN('incomplete_coarse_dirt_singularity'), FIN('incomplete_coarse_dirt_singularity'))
    ]).transitionalItem(FIN('incomplete_coarse_dirt_singularity')).loops(16).id('finality:coarse_dirt_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:sand"}')
    ],'minecraft:sand',[
        event.recipes.createDeploying(FIN('incomplete_sand_singularity'), [FIN('incomplete_sand_singularity'),'minecraft:sand']),
        event.recipes.createPressing(FIN('incomplete_sand_singularity'), FIN('incomplete_sand_singularity')),
        event.recipes.createPressing(FIN('incomplete_sand_singularity'), FIN('incomplete_sand_singularity')),
        event.recipes.createPressing(FIN('incomplete_sand_singularity'), FIN('incomplete_sand_singularity')),
        event.recipes.createPressing(FIN('incomplete_sand_singularity'), FIN('incomplete_sand_singularity'))
    ]).transitionalItem(FIN('incomplete_sand_singularity')).loops(16).id('finality:sand_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:cobblestone"}')
    ],'minecraft:cobblestone',[
        event.recipes.createFilling(FIN('incomplete_cobblestone_singularity'), [FIN('incomplete_cobblestone_singularity'), Fluid.of('minecraft:lava', 25)]),
        event.recipes.createDeploying(FIN('incomplete_cobblestone_singularity'), [FIN('incomplete_cobblestone_singularity'),'minecraft:cobblestone']),
        event.recipes.createPressing(FIN('incomplete_cobblestone_singularity'), FIN('incomplete_cobblestone_singularity')),
        event.recipes.createPressing(FIN('incomplete_cobblestone_singularity'), FIN('incomplete_cobblestone_singularity')),
        event.recipes.createPressing(FIN('incomplete_cobblestone_singularity'), FIN('incomplete_cobblestone_singularity'))
    ]).transitionalItem(FIN('incomplete_cobblestone_singularity')).loops(256).id('finality:cobblestone_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:framed_glass"}')
    ],'create:framed_glass',[
        event.recipes.createFilling(FIN('incomplete_framed_glass_singularity'), [FIN('incomplete_framed_glass_singularity'), Fluid.of('minecraft:lava', 25)]),
        event.recipes.createDeploying(FIN('incomplete_framed_glass_singularity'), [FIN('incomplete_framed_glass_singularity'),'create:framed_glass']),
        event.recipes.createPressing(FIN('incomplete_framed_glass_singularity'), FIN('incomplete_framed_glass_singularity')),
        event.recipes.createPressing(FIN('incomplete_framed_glass_singularity'), FIN('incomplete_framed_glass_singularity')),
        event.recipes.createPressing(FIN('incomplete_framed_glass_singularity'), FIN('incomplete_framed_glass_singularity'))
    ]).transitionalItem(FIN('incomplete_framed_glass_singularity')).loops(32).id('finality:framed_glass_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:precision_mechanism"}').withChance(75.0),
        Item.of('create:crushed_gold_ore', 16).withChance(25.0),
        Item.of('create:cogwheel', 32).withChance(25.0),
        Item.of('create:large_cogwheel', 8).withChance(25.0),
        '32x create:precision_mechanism'
    ],'create:precision_mechanism',[
        event.recipes.createDeploying(FIN('incomplete_precision_mechanism_singularity'), [FIN('incomplete_precision_mechanism_singularity'),'create:cogwheel']),
        event.recipes.createDeploying(FIN('incomplete_precision_mechanism_singularity'), [FIN('incomplete_precision_mechanism_singularity'),'create:large_cogwheel']),
        event.recipes.createDeploying(FIN('incomplete_precision_mechanism_singularity'), [FIN('incomplete_precision_mechanism_singularity'),'extendedcrafting:redstone_nugget']),
        event.recipes.createDeploying(FIN('incomplete_precision_mechanism_singularity'), [FIN('incomplete_precision_mechanism_singularity'),'create:precision_mechanism']),
        event.recipes.createPressing(FIN('incomplete_precision_mechanism_singularity'), FIN('incomplete_precision_mechanism_singularity')),
        event.recipes.createPressing(FIN('incomplete_precision_mechanism_singularity'), FIN('incomplete_precision_mechanism_singularity'))
    ]).transitionalItem(FIN('incomplete_precision_mechanism_singularity')).loops(16).id('finality:precision_mechanism_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:sturdy_sheet"}')
    ],'create:sturdy_sheet',[
        event.recipes.createFilling(FIN('incomplete_sturdy_sheet_singularity'), [FIN('incomplete_sturdy_sheet_singularity'), Fluid.of('minecraft:lava', 25)]),
        event.recipes.createDeploying(FIN('incomplete_sturdy_sheet_singularity'), [FIN('incomplete_sturdy_sheet_singularity'),'create:sturdy_sheet']),
        event.recipes.createPressing(FIN('incomplete_sturdy_sheet_singularity'), FIN('incomplete_sturdy_sheet_singularity')),
        event.recipes.createPressing(FIN('incomplete_sturdy_sheet_singularity'), FIN('incomplete_sturdy_sheet_singularity')),
        event.recipes.createPressing(FIN('incomplete_sturdy_sheet_singularity'), FIN('incomplete_sturdy_sheet_singularity')),
        event.recipes.createPressing(FIN('incomplete_sturdy_sheet_singularity'), FIN('incomplete_sturdy_sheet_singularity'))
    ]).transitionalItem(FIN('incomplete_sturdy_sheet_singularity')).loops(16).id('finality:sturdy_sheet_singularity')
    // concrete singularities
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_black"}')
    ],'minecraft:black_concrete',[
        event.recipes.createDeploying(FIN('incomplete_concrete_black_singularity'), [FIN('incomplete_concrete_black_singularity'),'minecraft:black_concrete_powder']),
        event.recipes.createFilling(FIN('incomplete_concrete_black_singularity'), [FIN('incomplete_concrete_black_singularity'), Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing(FIN('incomplete_concrete_black_singularity'), FIN('incomplete_concrete_black_singularity')),
        event.recipes.createPressing(FIN('incomplete_concrete_black_singularity'), FIN('incomplete_concrete_black_singularity')),
        event.recipes.createPressing(FIN('incomplete_concrete_black_singularity'), FIN('incomplete_concrete_black_singularity'))
    ]).transitionalItem(FIN('incomplete_concrete_black_singularity')).loops(128).id('finality:black_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_gray"}')
    ],'minecraft:gray_concrete',[
        event.recipes.createDeploying(FIN('incomplete_concrete_gray_singularity'), [FIN('incomplete_concrete_gray_singularity'),'minecraft:gray_concrete_powder']),
        event.recipes.createFilling(FIN('incomplete_concrete_gray_singularity'), [FIN('incomplete_concrete_gray_singularity'), Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing(FIN('incomplete_concrete_gray_singularity'), FIN('incomplete_concrete_gray_singularity')),
        event.recipes.createPressing(FIN('incomplete_concrete_gray_singularity'), FIN('incomplete_concrete_gray_singularity')),
        event.recipes.createPressing(FIN('incomplete_concrete_gray_singularity'), FIN('incomplete_concrete_gray_singularity'))
    ]).transitionalItem(FIN('incomplete_concrete_gray_singularity')).loops(128).id('finality:gray_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_light_gray"}')
    ],'minecraft:light_gray_concrete',[
        event.recipes.createDeploying('finality:incomplete_concrete_light_gray_singularity', ['finality:incomplete_concrete_light_gray_singularity','minecraft:light_gray_concrete_powder']),
        event.recipes.createFilling('finality:incomplete_concrete_light_gray_singularity', ['finality:incomplete_concrete_light_gray_singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('finality:incomplete_concrete_light_gray_singularity', 'finality:incomplete_concrete_light_gray_singularity'),
        event.recipes.createPressing('finality:incomplete_concrete_light_gray_singularity', 'finality:incomplete_concrete_light_gray_singularity'),
        event.recipes.createPressing('finality:incomplete_concrete_light_gray_singularity', 'finality:incomplete_concrete_light_gray_singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:light_gray_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_white"}')
    ],'minecraft:white_concrete',[
        event.recipes.createDeploying('finality:incomplete_concrete_white_singularity', ['finality:incomplete_concrete_white_singularity','minecraft:white_concrete_powder']),
        event.recipes.createFilling('finality:incomplete_concrete_white_singularity', ['finality:incomplete_concrete_white_singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('finality:incomplete_concrete_white_singularity', 'finality:incomplete_concrete_white_singularity'),
        event.recipes.createPressing('finality:incomplete_concrete_white_singularity', 'finality:incomplete_concrete_white_singularity'),
        event.recipes.createPressing('finality:incomplete_concrete_white_singularity', 'finality:incomplete_concrete_white_singularity')
    ]).transitionalItem('finality:incomplete_concrete_white_singularity').loops(128).id('finality:white_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_brown"}')
    ],'minecraft:brown_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:brown_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:brown_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_pink"}')
    ],'minecraft:pink_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:pink_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:pink_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_cyan"}')
    ],'minecraft:cyan_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:cyan_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:cyan_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_blue"}')
    ],'minecraft:blue_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:blue_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:blue_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_lime"}').withChance(100.0)
    ],'minecraft:lime_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:lime_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:lime_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_green"}').withChance(100.0)
    ],'minecraft:green_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:green_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:green_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_yellow"}').withChance(100.0)
    ],'minecraft:yellow_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:yellow_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:yellow_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_purple"}').withChance(100.0)
    ],'minecraft:purple_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:purple_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:purple_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_magenta"}').withChance(100.0)
    ],'minecraft:magenta_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:magenta_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:magenta_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_orange"}').withChance(100.0)
    ],'minecraft:orange_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:orange_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:orange_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_red"}').withChance(100.0)
    ],'minecraft:red_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:red_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:red_concrete_singularity')
    event.recipes.createSequencedAssembly([
        Item.of('extendedcrafting:singularity','{Id:"extendedcrafting:concrete_light_blue"}').withChance(100.0)
    ],'minecraft:light_blue_concrete',[
        event.recipes.createDeploying('extendedcrafting:singularity', ['extendedcrafting:singularity','minecraft:light_blue_concrete_powder']),
        event.recipes.createFilling('extendedcrafting:singularity', ['extendedcrafting:singularity', Fluid.of('minecraft:water', 500)]),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity'),
        event.recipes.createPressing('extendedcrafting:singularity', 'extendedcrafting:singularity')
    ]).transitionalItem('extendedcrafting:singularity').loops(128).id('finality:light_blue_concrete_singularity')
    // mechanical crafting singularities
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:amethyst"}'), [
        ' LLLLLLL ',
        'LLLOOOLLL',
        'LLOOOOOLL',
        'LOOOOOOOL',
        'LOOOOOOOL',
        'LOOOOOOOL',
        'LLOOOOOLL',
        'LLLOOOLLL',
        ' LLLLLLL '
    ], {
        O: 'minecraft:amethyst_block',
        L: 'minecraft:crying_obsidian'
    }).id('finality:amethyst_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:brass"}'), [
        ' LLLLLLL ',
        'LLLBBBLLL',
        'LLBBBBBLL',
        'LBBBBBBBL',
        'LBBBBBBBL',
        'LBBBBBBBL',
        'LLBBBBBLL',
        'LLLBBBLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        B: 'create:brass_block'
    }).id('finality:brass_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:coal"}'), [
        ' CCCCCCC ',
        'CCCCCCCCC',
        'CCCCCCCCC',
        'CCCCCCCCC',
        'CCCCCCCCC',
        'CCCCCCCCC',
        'CCCCCCCCC',
        'CCCCCCCCC',
        ' CCCCCCC '
    ], {
        C: 'minecraft:coal_block'
    }).id('finality:coal_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:copper"}'), [
        ' LLLLLLL ',
        'LLLCCCLLL',
        'LLCCCCCLL',
        'LCCCCCCCL',
        'LCCCCCCCL',
        'LCCCCCCCL',
        'LLCCCCCLL',
        'LLLCCCLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        C: 'minecraft:copper_block'
    }).id('finality:copper_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:diamond"}'), [
        ' LLLLLLL ',
        'LLLDDDLLL',
        'LLDDDDDLL',
        'LDDDDDDDL',
        'LDDDDDDDL',
        'LDDDDDDDL',
        'LLDDDDDLL',
        'LLLDDDLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        D: 'minecraft:diamond_block'
    }).id('finality:diamond_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:emerald"}'), [
        ' LLLLLLL ',
        'LLLEEELLL',
        'LLEEEEELL',
        'LEEEEEEEL',
        'LEEEEEEEL',
        'LEEEEEEEL',
        'LLEEEEELL',
        'LLLEEELLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        E: 'minecraft:emerald_block'
    }).id('finality:emerald_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:electron_tube"}'), [
        ' LLLLLLL ',
        'LLLEEELLL',
        'LLEEEEELL',
        'LEEEEEEEL',
        'LEEEEEEEL',
        'LEEEEEEEL',
        'LLEEEEELL',
        'LLLEEELLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        E: 'create:electron_tube'
    }).id('finality:electron_tube_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:ender_pearl"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'minecraft:ender_pearl'
    }).id('finality:ender_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:glowstone"}'), [
        ' LLLLLLL ',
        'LLLGGGLLL',
        'LLGGGGGLL',
        'LGGGGGGGL',
        'LGGGGGGGL',
        'LGGGGGGGL',
        'LLGGGGGLL',
        'LLLGGGLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        G: 'minecraft:glowstone'
    }).id('finality:glowstone_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:gold"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL ' 
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'minecraft:gold_block'
    }).id('finality:gold_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:gunpowder"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'minecraft:gunpowder'
    }).id('finality:gunpowder_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:honey"}'), [
        ' LLLLLLL ',
        'LLLRRRLLL',
        'LLRRRRRLL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LLRRRRRLL',
        'LLLRRRLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        R: 'minecraft:honey_block'
    }).id('finality:honey_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:iron"}'), [
        ' LLLLLLL ',
        'LLLFFFLLL',
        'LLFFFFFLL',
        'LFFFFFFFL',
        'LFFFFFFFL',
        'LFFFFFFFL',
        'LLFFFFFLL',
        'LLLFFFLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        F: 'minecraft:iron_block'
    }).id('finality:iron_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:lapis_lazuli"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'minecraft:lapis_block'
    }).id('finality:lapis_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:netherite"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'minecraft:netherite_block'
    }).id('finality:netherite_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:sea_lantern"}'), [
        ' LLLLLLL ',
        'LLLRRRLLL',
        'LLRRRRRLL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LLRRRRRLL',
        'LLLRRRLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        R: 'minecraft:sea_lantern'
    }).id('finality:prismarine_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:quartz"}'), [
        ' LLLLLLL ',
        'LLLQQQLLL',
        'LLQQQQQLL',
        'LQQQQQQQL',
        'LQQQQQQQL',
        'LQQQQQQQL',
        'LLQQQQQLL',
        'LLLQQQLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        Q: 'minecraft:quartz_block'
    }).id('finality:quartz_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:redstone"}'), [
        ' LLLLLLL ',
        'LLLRRRLLL',
        'LLRRRRRLL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LLRRRRRLL',
        'LLLRRRLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        R: 'minecraft:redstone_block'
    }).id('finality:redstone_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:rose_quartz"}'), [
        ' LLLLLLL ',
        'LLLRRRLLL',
        'LLRRRRRLL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LRRRRRRRL',
        'LLRRRRRLL',
        'LLLRRRLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        R: 'create:polished_rose_quartz'
    }).id('finality:rose_quartz_singularity') // apparently made a typo here and typed rose as rosse instead in the JSON syntax version
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:source_gem"}'), [
        ' LLLLLLL ',
        'LLLAAALLL',
        'LLAAAAALL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LAAAAAAAL',
        'LLAAAAALL',
        'LLLAAALLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        A: 'ars_nouveau:source_gem_block'
    }).id('finality:source_gem_singularity')
    event.recipes.createMechanicalCrafting(Item.of('extendedcrafting:singularity', '{Id:"extendedcrafting:zinc"}'), [
        ' LLLLLLL ',
        'LLLZZZLLL',
        'LLZZZZZLL',
        'LZZZZZZZL',
        'LZZZZZZZL',
        'LZZZZZZZL',
        'LLZZZZZLL',
        'LLLZZZLLL',
        ' LLLLLLL '
    ], {
        L: 'minecraft:crying_obsidian',
        Z: 'create:zinc_block'
    }).id('finality:zinc_singularity')
})

    /* archived recipes
    event.custom({
        type: 'extendedcrafting:shaped_table',
        pattern: [
            'GGG',
            'GSG',
            'OOO'
        ],
        key: {
            G: '#forge:glass/colorless',
            S: 'extendedcrafting:ender_star',
            O: 'minecraft:obsidian'
        },
        result: 'minecraft:beacon'
    }).id('finality:beacon')
    */