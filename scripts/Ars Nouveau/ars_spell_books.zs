// Ars T1 Book
recipes.removeByName("ars_nouveau:novice_spell_book");
craftingTable.addShapeless("novice_spell_book", <item:ars_nouveau:novice_spell_book>, [<item:minecraft:book>, <item:minecraft:diamond_shovel>, <item:minecraft:diamond_pickaxe>, <item:minecraft:diamond_axe>, <item:minecraft:diamond_sword>]);
// Original script: craftingTable.addShapeless("novice_spell_book", <item:ars_nouveau:novice_spell_book>, [<item:minecraft:book>, <item:projecte:dm_shovel>, <item:projecte:dm_pick>, <item:projecte:dm_axe>, <item:projecte:dm_sword>]);

// Ars T2 Book 
recipes.removeByName("ars_nouveau:apprentice_spell_book_upgrade");
craftingTable.addShapeless("apprentice_spell_book", <item:ars_nouveau:apprentice_spell_book>, [<item:ars_nouveau:novice_spell_book>, <item:minecraft:crying_obsidian>, <item:minecraft:netherite_block>, <item:minecraft:netherite_block>, <item:minecraft:netherite_block>, <item:extendedcrafting:luminessence_block>, <item:extendedcrafting:luminessence_block>, <item:create:blaze_cake>, <item:create:precision_mechanism>]);

// Ars T3 Book
recipes.removeByName("ars_nouveau:archmage_spell_book_upgrade");
craftingTable.addShapeless("archmage_spell_book_upgrade", <item:ars_nouveau:archmage_spell_book>, [<item:ars_nouveau:apprentice_spell_book>, <item:extendedcrafting:ender_star_block>, <item:ars_nouveau:wilden_tribute>, <item:extendedcrafting:ultimate_catalyst>, <item:extendedcrafting:ultimate_catalyst>, <item:projecte:dark_matter_block>, <item:projecte:dark_matter_block>, <item:projecte:dark_matter_block>, <item:extendedcrafting:singularity>.withTag({Id: "extendedcrafting:netherite"})]);